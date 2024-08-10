import { useEffect, useRef, useState } from "react";
import { useNuiEvent } from "../hooks/useNuiEvent";
import controlsIcon from "../assets/icons/controls.svg";
import defaultBanner from "../assets/images/defaultBanner.svg";

// Items
import Button from "./items/button/button";
import Line from "./items/line/line";
import Separator from "./items/separator/separator";
import { fetchNui } from "../utils/fetchNui";
import Checkbox from "./items/checkbox/checkbox";
import List from "./items/list/list";

function Menu() {
  const [visible, setVisible] = useState<boolean>(false);
  const [items, setItems] = useState<any[]>([]);
  const [title, setTitle] = useState<string>("");
  const [subtitle, setSubtitle] = useState<string>("");
  const [banner, setBanner] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [index, setIndex] = useState<number>(1);
  const itemsRef = useRef<HTMLDivElement>(null);
  let itemIndex: number;
  let isSelected: boolean;
  let table: number[] = [];

  useNuiEvent("zUI-ManageMenu", (data: any) => {
    if (data.parent) {
      setItems(data.parent.items);
      setTitle(data.parent.title);
      setSubtitle(data.parent.subtitle);
      setBanner(data.parent.banner);
    } else {
      setVisible(data.isVisible);
    }
    if (data.isVisible) {
      setItems(data.menu.items);
      setTitle(data.menu.title);
      setSubtitle(data.menu.subtitle);
      setBanner(data.menu.banner);
    }
    if (data.isVisible === false) {
      setIndex(1);
    }
  });

  const sendMessageToCheckbox = (id: string, isPressed: boolean) => {
    window.postMessage({ type: "UPDATE_CHECKBOX", id, isPressed }, "*");
  };

  const sendMessageToList = (id: string, action: string) => {
    window.postMessage({ type: "UPDATE_LIST", id, action }, "*");
  };

  const nbTotalItems = items.filter(
    (item) =>
      item.type !== "separator" &&
      item.type !== "line" &&
      !item.styles.isDisabled
  ).length;

  useNuiEvent("zUI-Interaction", (data: any) => {
    if (data.type === "down") {
      if (index !== nbTotalItems) {
        setIndex(index + 1);
      } else {
        setIndex(1);
      }
    } else if (data.type === "up") {
      if (index > 1) {
        setIndex(index - 1);
      } else {
        setIndex(nbTotalItems);
      }
    } else if (data.type === "enter") {
      switch (items[itemIndex]?.type) {
        case "button":
          if (items[itemIndex].actionId) {
            fetchNui("zUI-ActionButton", items[itemIndex].actionId);
          }
          break;
        case "checkbox":
          if (items[itemIndex].actionId) {
            sendMessageToCheckbox(items[itemIndex].actionId, true);
          }
          break;
        case "list":
          if (items[itemIndex].actionId) {
            sendMessageToList(items[itemIndex].actionId, "enter");
          }
          break;
        default:
          break;
      }
    } else if (data.type === "right" || data.type === "left") {
      let item = items[itemIndex];
      if (item.type === "list" && item.actionId) {
        sendMessageToList(items[itemIndex].actionId, data.type);
      }
    }
  });

  useEffect(() => {
    if (itemsRef.current) {
      if (index === 1) {
        itemsRef.current.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        const selectedItem = itemsRef.current.children[
          table[index - 1]
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
  }, [index, table]);

  useEffect(() => {
    if (items.length > 0) {
      const selectedItem = items.find((item, idx) => {
        if (
          item.type !== "separator" &&
          item.type !== "line" &&
          !item.styles.isDisabled
        ) {
          if (!table.find((element) => element === idx)) {
            table.push(idx);
          }
          itemIndex = table[index - 1];
          return itemIndex === idx;
        }
        return false;
      });

      if (selectedItem) {
        setDescription(selectedItem.description);
        fetchNui("zUI-Hovered", selectedItem.actionId);
      }
    }
  }, [index, items]);

  return (
    <>
      {visible && (
        <div className="container">
          <div id="menu">
            <div className="banner-container">
              <h1 id="title">{title}</h1>
              <img
                style={{
                  width: "100%",
                  borderRadius: "1.25em 1.25em 0 0",
                }}
                id="banner"
                src={banner ? banner : defaultBanner}
                alt="menu-banner"
              />
            </div>
            <div id="informations">
              <h1 id="subtitle">{subtitle}</h1>
              <h1 id="counter">
                {nbTotalItems > 0 ? index : 0}/{nbTotalItems}
              </h1>
            </div>
            <div className="items" ref={itemsRef}>
              {items
                ? items.map((item, idx) => {
                    if (
                      item.type !== "separator" &&
                      item.type !== "line" &&
                      !item.styles.isDisabled
                    ) {
                      if (!table.find((element) => element === idx)) {
                        table.push(idx);
                      }
                      itemIndex = table[index - 1];
                      isSelected = itemIndex === idx;
                    }
                    switch (item.type) {
                      case "button":
                        return (
                          <Button
                            key={idx}
                            {...{
                              Label: item.label,
                              Styles: {
                                leftBadge: item.styles.leftBadge,
                                rightBadge: item.styles.rightBadge,
                                rightLabel: item.styles.rightLabel,
                                color: item.styles.color,
                                hoverColor: item.styles.hoverColor,
                                isDisabled: item.styles.isDisabled,
                              },
                              onHovered: !item.styles.isDisabled && isSelected,
                            }}
                          />
                        );
                      case "line":
                        return <Line key={idx} {...{ Colors: item.colors }} />;
                      case "separator":
                        return (
                          <Separator key={idx} {...{ Label: item.label }} />
                        );
                      case "checkbox":
                        return (
                          <Checkbox
                            key={idx}
                            {...{
                              Label: item.label,
                              Styles: {
                                leftBadge: item.styles.leftBadge,
                                color: item.styles.color,
                                hoverColor: item.styles.hoverColor,
                                isDisabled: item.styles.isDisabled,
                                checkedColor: item.styles.checkedColor,
                              },
                              onHovered: !item.styles.isDisabled && isSelected,
                              defaultState: item.defaultState,
                              actionId: item.actionId,
                            }}
                          />
                        );
                      case "list":
                        return (
                          <List
                            key={idx}
                            {...{
                              Label: item.label,
                              Items: item.items,
                              Styles: {
                                isDisabled: item.styles.isDisabled,
                                color: item.styles.color,
                                hoverColor: item.styles.hoverColor,
                              },
                              onHovered: !item.styles.isDisabled && isSelected,
                              actionId: item.actionId,
                            }}
                          />
                        );
                    }
                  })
                : null}
            </div>
            <div id="controls">
              <img
                style={{
                  width: "3%",
                }}
                src={controlsIcon}
                alt="controls"
              />
            </div>
            {description.length > 0 && (
              <div id="description">
                <h1>{description}</h1>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Menu;
