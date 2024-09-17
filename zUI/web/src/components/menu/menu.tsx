import { useState, useEffect, useRef, useCallback } from "react";
import { useNuiEvent } from "../../Hooks/useNuiEvent";
import isUrl from "../../utils/isUrl";
import Controls from "../../assets/icons/controls.svg";
import { fetchNui } from "../../utils/fetchNui";
import { motion, AnimatePresence } from "framer-motion";
import formatString from "../../utils/formatString";

// Items
import Line from "../items/line/line";
import Separator from "../items/separator/separator";
import Button from "../items/button/button";
import LinkButton from "../items/linkButton/linkButton";
import Checkbox from "../items/checkbox/checkbox";
import List from "../items/list/list";

// Props

interface ThemeProps {
  theme: {};
}

interface SpriteProps {
  image: string;
}

interface ResetProps {
  lastMenu: string;
  newMenu: string;
}

interface MenuProps {
  isVisible: boolean;
  items: [];
  title: string;
  subtitle: string;
  banner: string;
}

interface ItemInterface {
  type: string;
  title: string;
  description: string;
  styles: {
    IsDisabled?: boolean;
    RightLabel?: string;
    RightBadge?: string;
    LeftBadge?: string;
    Color?: string;
  };
  state: boolean;
  items: string[];
  link: string;
  actionId: string;
  isSelected: boolean;
  hoverType: "complete" | "rod" | "neon";
  colors?: string[];
  rounded: boolean;
  defaultColor: string;
  position: string;
}

interface InteractionInterface {
  type: string;
}

function Menu() {
  const [visible, setVisible] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [subtitle, setSubtitle] = useState<string>("");
  const [theme, setTheme] = useState<any>(null);
  const [description, setDescription] = useState<string>("");
  const [items, setItems] = useState<ItemInterface[]>([]);
  const [index, setIndex] = useState<number>(1);
  const [banner, setBanner] = useState<string>("");
  const [IndexHistory, setIndexHistory] = useState<{ [key: string]: number }>(
    {}
  );
  const [image, setImage] = useState<string>("");

  // Variables
  let Items: number[] = [];
  let ItemIndex: number;
  let IsSelected: boolean = false;
  let NumberOfItems =
    items && items.length > 0
      ? items.filter(
          (item) =>
            item.type !== "line" &&
            item.type !== "separator" &&
            !item.styles.IsDisabled
        ).length
      : 0;
  const itemsRef = useRef<HTMLDivElement>(null);

  // Functions
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
    if (items && items.length > 0) {
      const SelectedItem = items.find((item, id) => {
        if (
          item.type !== "separator" &&
          item.type !== "line" &&
          !item.styles.IsDisabled
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
        setDescription(SelectedItem.description);
        if (SelectedItem.type !== "linkButton") {
          fetchNui("zUI-Hover", { actionId: SelectedItem.actionId });
        }
      }
    }
  }, [index, items]);

  // Events

  const SendMessageToList = (id: string, action: string) => {
    window.postMessage({ type: "UPDATE_LIST", id, action }, "*");
  };

  useEffect(() => {
    if (!theme) {
      fetchNui("zUI-GetTheme", {});
    }
  });

  useNuiEvent("zUI-ManageMenu", (data: MenuProps) => {
    setVisible(data.isVisible);
    setBanner(data.banner);
    setTitle(data.title);
    setSubtitle(data.subtitle);
    setItems(data.items);
  });

  useNuiEvent("zUI-Reset", (data: ResetProps) => {
    let LastMenu: string = data.lastMenu;
    let NewMenu: string = data.newMenu;

    setIndexHistory((prev) => ({
      ...prev,
      [LastMenu]: index,
    }));

    handleIndexChange(IndexHistory[NewMenu] || 1);
    setDescription("");
  });

  useNuiEvent("zUI-SetTheme", (data: ThemeProps) => {
    setTheme(data.theme);
  });

  const [timeout, setTimeoutId] = useState<ReturnType<
    typeof setTimeout
  > | null>(null);
  useNuiEvent("zUI-RenderSprite", (data: SpriteProps) => {
    if (timeout) clearTimeout(timeout);
    setImage(data.image);
    setTimeoutId(
      setTimeout(() => {
        setImage("");
      }, 100)
    );
  });

  useNuiEvent("zUI-Interact", (data: InteractionInterface) => {
    if (data.type === "up") {
      fetchNui("zUI-PlaySound", { Type: data.type });
      if (index > 1) {
        handleIndexChange(index - 1);
      } else {
        handleIndexChange(NumberOfItems);
      }
    } else if (data.type === "down") {
      fetchNui("zUI-PlaySound", { Type: data.type });
      if (index < NumberOfItems) {
        handleIndexChange(index + 1);
      } else {
        handleIndexChange(1);
      }
    } else if (data.type === "enter") {
      fetchNui("zUI-PlaySound", { Type: data.type });
      let item = items[ItemIndex];
      switch (item?.type) {
        case "button":
          if (item.actionId) {
            fetchNui("zUI-UseButton", item.actionId);
          }
          break;
        case "linkButton":
          if (item.link) {
            //@ts-ignore
            window.invokeNative("openUrl", item.link);
          }
          break;
        case "checkbox":
          if (item.actionId) {
            fetchNui("zUI-UseCheckbox", item.actionId);
          }
          break;
        case "list":
          if (item.actionId) {
            SendMessageToList(item.actionId, "enter");
          }
          break;
      }
    } else if (data.type === "left" || data.type === "right") {
      let item = items[ItemIndex];
      if (item.actionId) {
        SendMessageToList(item.actionId, data.type);
        if (item.type === "list") {
          fetchNui("zUI-PlaySound", { Type: data.type });
        }
      }
    }
  });

  const getPositionStyles = () => {
    if (!theme) return {};

    let initial: any = {};
    let animate: any = {};
    let exit: any = {};

    switch (theme.position) {
      case "left":
        initial = { x: "-50%" };
        animate = { x: "0%" };
        exit = { x: "-50%" };
        break;
      case "right":
        initial = { x: "128%" };
        animate = { x: "78%" };
        exit = { x: "128%" };
        break;
      default:
        initial = { x: "0%" };
        animate = { x: "0%" };
        exit = { x: "0%" };
        break;
    }

    return { initial, animate, exit };
  };

  const positionStyles = getPositionStyles();

  return (
    <>
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={positionStyles.initial}
            animate={positionStyles.animate}
            exit={positionStyles.exit}
            transition={{ duration: 0.6 }}
            id="zUI-Container"
          >
            <div
              id="zUI-Menu"
              style={{
                background:
                  theme?.colors?.background || "rgba(18, 18, 18, 0.5)",
                borderRadius: theme?.corners?.rounded
                  ? `${theme?.corners?.radius}em` || "0.5em"
                  : "0",
                top: `${theme?.positions?.x}vh` || "1.5vh",
                boxShadow: theme?.perspective
                  ? theme?.position == "left"
                    ? "-0.25vw 0 10px rgba(0, 0, 0, 0.5)"
                    : "0.25vw 0 10px rgba(0, 0, 0, 0.5)"
                  : "none",
                transform: theme?.perspective
                  ? theme?.position == "left"
                    ? "rotateY(20deg) translateX(2vw)"
                    : "rotateY(-10deg)"
                  : "none",
              }}
            >
              <div
                id="zUI-Banner"
                style={{
                  minHeight:
                    !isUrl(banner) && !isUrl(theme?.banner) ? "10vh" : "none",
                  background:
                    banner.length > 1 && !isUrl(banner)
                      ? banner
                      : theme?.banner && !isUrl(theme.banner)
                      ? theme.banner
                      : "none",
                }}
              >
                {banner.length < 1 && isUrl(theme?.banner) && (
                  <img id="zUI-BannerImage" src={theme.banner} />
                )}
                {banner.length > 1 && isUrl(banner) && (
                  <img id="zUI-BannerImage" src={banner} />
                )}
                <h1
                  className="zUI-BoldText"
                  style={{
                    position: "absolute",
                  }}
                >
                  {theme?.stringUpper ? title.toUpperCase() : title}
                </h1>
              </div>
              <div
                id="zUI-Informations"
                style={{
                  background: theme?.colors?.secondary || "transparent",
                }}
              >
                <h1 className="zUI-MediumText">
                  {theme?.stringUpper ? subtitle.toUpperCase() : subtitle}
                </h1>
                {theme?.counter && (
                  <h1 id="zUI-Counter">
                    {index}/{NumberOfItems}
                  </h1>
                )}
              </div>
              <div id="zUI-Items" ref={itemsRef}>
                {items &&
                  items.length > 0 &&
                  items.map((item, id) => {
                    if (
                      item.type !== "line" &&
                      item.type !== "separator" &&
                      !item.styles.IsDisabled
                    ) {
                      if (!Items.find((item) => item === id)) {
                        Items.push(id);
                      }
                      ItemIndex = Items[index - 1];
                      IsSelected = ItemIndex === id;
                    }
                    switch (item.type) {
                      case "line":
                        item.rounded = theme?.items?.line?.rounded;
                        item.defaultColor = theme?.items?.defaultColor;
                        return <Line {...item} />;
                      case "separator":
                        return <Separator {...item} />;
                      case "button":
                        item.isSelected = !item.styles.IsDisabled && IsSelected;
                        item.defaultColor = theme?.items?.defaultColor;
                        item.hoverType = theme?.items?.hoverStyle;
                        return <Button key={id} {...item} />;
                      case "linkButton":
                        item.isSelected = !item.styles.IsDisabled && IsSelected;
                        item.defaultColor = theme?.items?.defaultColor;
                        item.hoverType = theme?.items?.hoverStyle;
                        return <LinkButton key={id} {...item} />;
                      case "checkbox":
                        item.isSelected = !item.styles.IsDisabled && IsSelected;
                        item.defaultColor = theme?.items?.defaultColor;
                        item.hoverType = theme?.items?.hoverStyle;
                        return <Checkbox key={id} {...item} />;
                      case "list":
                        item.isSelected = !item.styles.IsDisabled && IsSelected;
                        item.defaultColor = theme?.items?.defaultColor;
                        item.hoverType = theme?.items?.hoverStyle;
                        return <List key={id} {...item} />;
                    }
                  })}
              </div>
              {theme?.controlsIndicator && (
                <div
                  id="zUI-ControlsIndicator"
                  style={{
                    background: theme?.colors?.secondary || "transparent",
                  }}
                >
                  <img src={Controls} className="zUI-Icon" />
                </div>
              )}
              {description.length > 0 && (
                <div
                  id="description"
                  style={
                    !theme?.controlsIndicator
                      ? {
                          background: theme?.colors?.secondary || "transparent",
                        }
                      : {}
                  }
                >
                  <h2>{formatString(description)}</h2>
                </div>
              )}
              {image.length > 0 && <img src={image} id="zUI-Sprite" />}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Menu;
