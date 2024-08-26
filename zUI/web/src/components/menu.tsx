import { useState, useEffect, useRef, useCallback } from "react";
import { useNuiEvent } from "../Hooks/useNuiEvent";
import { motion, AnimatePresence } from "framer-motion";
import Background from "../assets/images/background.png";
import Controls from "../assets/icons/controls.svg";
import DefaultBanner from "../assets/images/DefaultBanner.svg";
import Button from "./items/button/button";
import { fetchNui } from "../utils/fetchNui";
import Line from "./items/line/line";
import Separator from "./items/separator/separator";
import List from "./items/list/list";
import Checkbox from "./items/checkbox/checkbox";
import formatString from "../utils/formatString";

// Interfaces
interface SetVisibleInterface {
  IsVisible: boolean;
  Title: string;
  Subtitle: string;
  HoverType: string;
  Banner?: string;
}

interface SetItemsInterface {
  IsVisible: boolean;
  Items: [];
  Title: string;
  Subtitle: string;
  Banner?: string;
}

interface InteractionInterface {
  Type: string;
}

interface ItemInterface {
  Type: string;
  Title: string;
  Description: string;
  Styles: {
    IsDisabled?: boolean;
  };
  Items: string[];
  Colors?: string[];
  DefaultState: boolean;
  ActionId: string;
  IsSelected?: boolean;
  DefaultColor: string;
  HoverType: string;
}

function Menu() {
  // Menu informations
  const [visible, setVisible] = useState<boolean>(false);
  const [banner, setBanner] = useState<string>("");
  const [title, setTitle] = useState<string>("test");
  const [subtitle, setSubtitle] = useState<string>("");
  const [items, setItems] = useState<ItemInterface[]>([]);
  const [index, setIndex] = useState<number>(1);
  const [description, setDescription] = useState<string>("");
  const [hoverType, setHoverType] = useState<string>("");

  // Variables
  let Items: number[] = [];
  let ItemIndex: number;
  let IsSelected: boolean = false;
  let NumberOfItems = items.filter(
    (item) =>
      item.Type !== "line" &&
      item.Type !== "separator" &&
      !item.Styles.IsDisabled
  ).length;
  const itemsRef = useRef<HTMLDivElement>(null);

  const debounce = (func: Function, delay: number) => {
    let timeoutId: number;
    return (...args: any[]) => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const handleIndexChange = useCallback(
    debounce((newIndex: number) => {
      setIndex(newIndex);
    }, 100),
    []
  );

  // Events
  const SendMessageToCheckbox = (id: string) => {
    window.postMessage({ type: "UPDATE_CHECKBOX", id }, "*");
  };

  const SendMessageToList = (id: string, action: string) => {
    window.postMessage({ type: "UPDATE_LIST", id, action }, "*");
  };

  // Nui Events
  useNuiEvent("zUI-SetVisible", (data: SetVisibleInterface) => {
    setVisible(data.IsVisible);
    if (data.IsVisible) {
      setTitle(data.Title);
      setSubtitle(data.Subtitle);
      setHoverType(data.HoverType);
      if (data.Banner) {
        setBanner(data.Banner);
      }
    }
    fetchNui("zUI-PlaySound", {
      Type: data.IsVisible ? "toggle" : "backspace",
    });
  });

  useNuiEvent("zUI-Reset", () => {
    handleIndexChange(1);
    setDescription("");
  });

  useNuiEvent("zUI-ManageMenu", (data: SetItemsInterface) => {
    setVisible(data.IsVisible);
    setItems(data.Items);
    setTitle(data.Title);
    setSubtitle(data.Subtitle);
    if (data.Banner) {
      setBanner(data.Banner);
    }
  });

  useNuiEvent("zUI-Interaction", (data: InteractionInterface) => {
    if (data.Type === "up") {
      fetchNui("zUI-PlaySound", { Type: data.Type });
      if (index > 1) {
        handleIndexChange(index - 1);
      } else {
        handleIndexChange(NumberOfItems);
      }
    } else if (data.Type === "down") {
      fetchNui("zUI-PlaySound", { Type: data.Type });
      if (index < NumberOfItems) {
        handleIndexChange(index + 1);
      } else {
        handleIndexChange(1);
      }
    } else if (data.Type === "enter") {
      fetchNui("zUI-PlaySound", { Type: data.Type });
      let item = items[ItemIndex];
      switch (item?.Type) {
        case "button":
          if (item.ActionId) {
            fetchNui("zUI-UseButton", item.ActionId);
          }
        case "list":
          if (item.ActionId) {
            SendMessageToList(item.ActionId, "enter");
          }
        case "checkbox":
          if (item.ActionId) {
            SendMessageToCheckbox(item.ActionId);
          }
      }
      fetchNui("zUI-PlaySound", { type: "enter" });
    } else if (data.Type === "left" || data.Type === "right") {
      let item = items[ItemIndex];
      if (item.ActionId) {
        SendMessageToList(item.ActionId, data.Type);
        if (item.Type === "list") {
          fetchNui("zUI-PlaySound", { Type: data.Type });
        }
      }
    }
  });

  // UseEffect
  useEffect(() => {
    if (itemsRef.current) {
      if (index === 1) {
        itemsRef.current.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        const selectedItem = itemsRef.current.children[
          Items[index - 1]
        ] as HTMLElement;
        if (selectedItem) {
          const itemRect = selectedItem.getBoundingClientRect();
          const parentRect = itemsRef.current.getBoundingClientRect();

          if (
            itemRect.top < parentRect.top ||
            itemRect.bottom > parentRect.bottom
          ) {
            selectedItem.scrollIntoView({
              behavior: "smooth",
              block: "nearest",
            });
          }
        }
      }
    }
  }, [index, Items]);

  useEffect(() => {
    if (items.length > 0) {
      const SelectedItem = items.find((item, id) => {
        if (
          item.Type !== "separator" &&
          item.Type !== "line" &&
          !item.Styles.IsDisabled
        ) {
          if (!Items.find((item) => item === id)) {
            Items.push(id);
          }
          ItemIndex = Items[index - 1];
          return ItemIndex === id;
        }
        return false;
      });

      if (SelectedItem) {
        setDescription(SelectedItem.Description);
        fetchNui("zUI-HoverItem", SelectedItem.ActionId);
      }
    }
  }, [index, items]);

  return (
    <>
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ x: -500 }}
            animate={{ x: 0 }}
            exit={{ x: -500 }}
            transition={{ duration: 0.5 }}
            className="zUI-Container"
          >
            <div id="zUI-Menu">
              <div id="zUI-BannerContainer">
                <h1 id="zUI-MenuTitle">{title}</h1>
                <img src={banner || DefaultBanner} id="zUI-MenuBanner" />
              </div>
              <div id="zUI-MenuInformations">
                <h1 id="zUI-MenuSubTitle">{subtitle}</h1>
                <h1 id="zUI-MenuIndexs">
                  {index}/{NumberOfItems}
                </h1>
              </div>
              <div id="zUI-MenuItems" ref={itemsRef}>
                {items &&
                  items.length > 0 &&
                  items.map((item, id) => {
                    if (
                      item.Type !== "line" &&
                      item.Type !== "separator" &&
                      !item.Styles.IsDisabled
                    ) {
                      if (!Items.find((item) => item === id)) {
                        Items.push(id);
                      }
                      ItemIndex = Items[index - 1];
                      IsSelected = ItemIndex === id;
                    }
                    switch (item.Type) {
                      case "button":
                        item.IsSelected = !item.Styles.IsDisabled && IsSelected;
                        item.HoverType = hoverType;
                        return <Button key={id} {...item} />;
                      case "line":
                        return <Line {...item} />;
                      case "separator":
                        return <Separator {...item} />;
                      case "list":
                        item.HoverType = hoverType;
                        item.IsSelected = !item.Styles.IsDisabled && IsSelected;
                        return <List {...item} />;
                      case "checkbox":
                        item.HoverType = hoverType;
                        item.IsSelected = !item.Styles.IsDisabled && IsSelected;
                        return <Checkbox {...item} />;
                    }
                  })}
              </div>
              <div id="zUI-ControlsIndicator">
                <img src={Controls} id="zUI-ControlsIcon" />
              </div>
              {description.length > 0 && (
                <div id="description">
                  <h1>{formatString(description)}</h1>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Menu;
