import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Theme
import defaultTheme from "./defaultTheme.json";

// StyleSheets
import "./menu.css";

// Props
import {
  ThemeProps,
  MenuProps,
  ResetProps,
  ItemProps,
  InteractionProps,
  InfoPanelProps,
} from "./props";

// Functions
import isUrl from "../../utils/functions/isUrl";
import extractFontName from "../../utils/functions/extractFontName";
import extractFontWeight from "../../utils/functions/extractFontWeight";
import formatString from "../../utils/functions/formatString";

// Hooks
import fetchNui from "../../hooks/fetchNui";
import useNuiEvent from "../../hooks/useNuiEvent";
import { getAnimation } from "./animations";

// Items
import Button from "../items/button/button";
import Line from "../items/line/line";
import Separator from "../items/separator/separator";
import LinkButton from "../items/linkButton/linkButton";
import Checkbox from "../items/checkbox/checkbox";
import Slider from "../items/slider/slider";
import List from "../items/list/list";
import ColorList from "../items/colorList/colorList";
import sleep from "../../utils/functions/sleep";

function Menu() {
  const [visible, setVisible] = useState(false);
  const [themeIsReceived, setThemeIsReceived] = useState<boolean>(false);
  const [theme, setTheme] = useState<ThemeProps>(defaultTheme as ThemeProps);
  const [banner, setBanner] = useState<string>(theme?.banner || "");
  const [title, setTitle] = useState<string>("");
  const [subtitle, setSubtitle] = useState<string>("");
  const [menuDescription, setMenuDescription] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [items, setItems] = useState<ItemProps[]>([]);
  const [index, setIndex] = useState<number>(1);
  const [indexHistory, setIndexHistory] = useState<{ [key: string]: number }>(
    {}
  );
  const [infosIsVisible, setInfosIsVisible] = useState<boolean>(false);
  const [informations, setInformations] = useState<string[][]>([]);
  const [infoPanelTitle, setInfoPanelTitle] = useState<string>("");
  const [infoPanelBanner, setInfoPanelBanner] = useState<string>("");

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

  const SendMessageToSlider = (id: string, action: string) => {
    window.postMessage({ type: "UPDATE_SLIDER", id, action }, "*");
  };

  // UseEffects
  useEffect(() => {
    if (itemsRef.current) {
      if (index === 1) {
        itemsRef.current.scrollTo({
          top: 0,
          behavior: theme.animations.onScroll ? "smooth" : "auto",
        });
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
              behavior: theme.animations.onScroll ? "smooth" : "auto",
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
        setDescription(SelectedItem.description || "");
        if (SelectedItem.type !== "linkButton") {
          fetchNui("zUI-Hover", { actionId: SelectedItem.actionId });
        }
      }
    }
  }, [index, items]);

  useEffect(() => {
    if (theme && theme?.fonts) {
      const links = Object.values(theme.fonts)
        .filter((fontUrl) => fontUrl)
        .map((fontUrl) => {
          const link = document.createElement("link");
          link.href = fontUrl;
          link.rel = "stylesheet";
          document.head.appendChild(link);
          return link;
        });
      return () => {
        links.forEach((link) => {
          if (link) document.head.removeChild(link);
        });
      };
    }
  }, [theme?.fonts]);

  useEffect(() => {
    if (!themeIsReceived) {
      fetchNui("zUI-GetMenuTheme", {});
    }
  }, [themeIsReceived]);

  // Nui Events
  useNuiEvent<ThemeProps>("zUI-SetMenuTheme", (data) => {
    setTheme(data);
    if (data !== null || data !== undefined) {
      setThemeIsReceived(true);
    }
  });

  const [infoTimeout, setInfoTimeoutId] = useState<ReturnType<
    typeof setTimeout
  > | null>(null);
  useNuiEvent("zUI-ShowInfoPanel", (data: InfoPanelProps) => {
    if (infoTimeout) clearTimeout(infoTimeout);
    setInfoPanelTitle(data.title);
    setInformations(data.infos);
    setInfoPanelBanner(data.banner);
    setInfosIsVisible(true);
    setInfoTimeoutId(
      setTimeout(() => {
        setInfosIsVisible(false);
        setInfoPanelTitle("");
        setInformations([]);
        setInfoPanelBanner("");
      }, 100)
    );
  });

  useNuiEvent("zUI-ManageMenu", (data: MenuProps) => {
    setVisible(data.isVisible);
    if (data.banner && data.banner.length > 2) {
      setBanner(data.banner);
    } else {
      setBanner(theme?.banner || "");
    }
    setTitle(data.title);
    setSubtitle(data.subtitle);
    setMenuDescription(data.description);
    setItems(data.items);
  });

  useNuiEvent("zUI-Reset", async (data: ResetProps) => {
    let LastMenu: string = data.lastMenu;
    let NewMenu: string = data.newMenu;
    setIndexHistory((prev) => ({
      ...prev,
      [LastMenu]: index,
    }));
    handleIndexChange(indexHistory[NewMenu] || 0);
    await sleep(100);
    setDescription("");
  });

  useNuiEvent("zUI-Interact", (data: InteractionProps) => {
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
      if (item) {
        switch (item?.type) {
          case "button":
            if (item.actionId) {
              fetchNui("zUI-UseButton", item.actionId);
            }
            break;
          case "checkbox":
            if (item.actionId) {
              fetchNui("zUI-UseCheckbox", item.actionId);
            }
            break;
          case "linkButton":
            if (item.link) {
              //@ts-ignore
              window.invokeNative("openUrl", item.link);
            }
            break;
          case "list":
            if (item.actionId) {
              fetchNui("zUI-UseList", {
                actionId: item.actionId,
                Selected: true,
                ListChange: false,
                Index: item.index,
              });
            }
            break;
          case "colorList":
            if (item.actionId) {
              fetchNui("zUI-UseList", {
                actionId: item.actionId,
                Selected: true,
                ListChange: false,
                Index: item.index,
              });
            }
            break;
          case "slider":
            if (item.actionId) {
              if (item.actionId) {
                SendMessageToSlider(item.actionId, "enter");
              }
            }
            break;
        }
      }
    } else if (data.type === "left" || data.type === "right") {
      let item = items[ItemIndex];
      if (item.actionId) {
        if (item.type === "list") {
          fetchNui("zUI-UseList", {
            actionId: item.actionId,
            ListChange: true,
            Index:
              data.type === "right"
                ? (item.index + 1) % item.items.length
                : item.index === 0
                ? item.items.length - 1
                : item.index - 1,
          });
          fetchNui("zUI-PlaySound", { Type: data.type });
        } else if (item.type === "slider") {
          SendMessageToSlider(item.actionId, data.type);
          fetchNui("zUI-PlaySound", { Type: data.type });
        } else if (item.type === "colorList") {
          fetchNui("zUI-UseList", {
            actionId: item.actionId,
            ListChange: true,
            Index:
              data.type === "right"
                ? (item.index + 1) % item.items.length
                : item.index === 0
                ? item.items.length - 1
                : item.index - 1,
          });
          fetchNui("zUI-PlaySound", { Type: data.type });
        }
      }
    }
  });

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          id="zUI-MenuContainer"
          style={{
            flexDirection: theme?.position === "left" ? "row" : "row-reverse",
          }}
          initial={getAnimation(theme.animations, theme.position).initialAnim}
          animate={getAnimation(theme.animations, theme.position).animateAnim}
          exit={getAnimation(theme.animations, theme.position).exitAnim}
          transition={{ duration: 0.5 }}
        >
          <div
            id="zUI-Menu"
            style={{
              padding: theme?.padding ? "0.75%" : "none",
              gap: theme?.padding ? "1vh" : "none",
              backgroundColor: theme?.colors?.background,
              borderRadius: `${theme?.cornersRadius}em`,
              boxShadow: theme?.perspective
                ? `${
                    theme?.position === "left" ? -0.25 : 0.25
                  }vw 0 10px rgba(0, 0, 0, 0.5)`
                : "none",
              transform: theme?.perspective
                ? `rotateY(${
                    theme?.position === "left" ? 20 : -20
                  }deg) translateX(${theme?.position === "left" ? 1 : -1}vw)`
                : "none",
            }}
          >
            <div
              id="zUI-MenuBanner"
              style={{
                minHeight: `${!isUrl(banner) ? "10vh" : "none"}`,
                borderRadius: `${theme?.padding ? 0.5 : 0}em`,
                background: `${!isUrl(banner) ? banner : "transparent"}`,
              }}
            >
              {banner && isUrl(banner) && (
                <img src={banner} style={{ width: "100%" }} />
              )}
              <div id="zUI-BannerTexts">
                <h1
                  className="zUI-BannerTitle"
                  style={{
                    fontFamily: `${extractFontName(
                      theme?.fonts?.title
                    )}, sans-serif`,
                    fontWeight: extractFontWeight(theme?.fonts?.title),
                  }}
                >
                  {formatString(title)}
                </h1>
                <h2
                  className="zUI-BannerSubtitle"
                  style={{
                    fontFamily: `${extractFontName(
                      theme?.fonts?.subtitle
                    )}, sans-serif`,
                    fontWeight: extractFontWeight(theme?.fonts?.subtitle),
                  }}
                >
                  {formatString(subtitle)}
                </h2>
              </div>
            </div>
            {theme?.displayDescription && (
              <div
                id="zUI-MenuDescriptionContainer"
                style={{
                  borderRadius: `${theme?.padding ? 0.5 : 0}em`,
                  backgroundColor: theme?.colors?.description,
                }}
              >
                <h1
                  className="zUI-MenuDescription"
                  style={{
                    fontFamily: `${extractFontName(
                      theme?.fonts?.description
                    )}, sans-serif`,
                    fontWeight: extractFontWeight(theme?.fonts?.description),
                  }}
                >
                  {formatString(menuDescription)}
                </h1>
                <h1
                  className="zUI-MenuDescription"
                  style={{
                    fontFamily: `${extractFontName(
                      theme?.fonts?.counter
                    )}, sans-serif`,
                    fontWeight: extractFontWeight(theme?.fonts?.counter),
                  }}
                >
                  {index}/{NumberOfItems}
                </h1>
              </div>
            )}
            <div
              id="zUI-MenuItemsContainer"
              ref={itemsRef}
              style={{
                gap: `${theme?.padding ? "1vh" : "0"}`,
                maxHeight: `${
                  theme?.padding
                    ? (theme?.items?.maxItems || 5) * 5
                    : (theme?.items?.maxItems || 5) * 4
                }vh`,
              }}
            >
              {items &&
                items.length > 0 &&
                items.map((item, id) => {
                  if (
                    item?.type !== "line" &&
                    item?.type !== "separator" &&
                    !item?.styles?.IsDisabled
                  ) {
                    if (!Items.find((item) => item === id)) {
                      Items.push(id);
                    }
                    ItemIndex = Items[index - 1];
                    IsSelected = ItemIndex === id;
                  }
                  switch (item.type) {
                    case "button":
                      item.isSelected = !item?.styles?.IsDisabled && IsSelected;
                      item.hoverColor = theme?.items?.hoverColor || "#FAAD2C";
                      item.hoverType = theme?.items?.hoverStyle || "complete";
                      item.paddingIsActive = theme?.padding || false;
                      return (
                        <Button
                          key={id}
                          {...item}
                          titleFont={theme.fonts.itemTitle}
                          rightLabelFont={theme.fonts.itemRightLabel}
                        />
                      );
                    case "line":
                      item.rounded = theme.items.lineIsRounded;
                      item.defaultColor = theme.colors.item;
                      item.paddingIsActive = theme?.padding || false;
                      return <Line {...item} />;
                    case "separator":
                      item.paddingIsActive = theme?.padding || false;
                      return (
                        <Separator
                          {...item}
                          titleFont={theme.fonts.itemTitle}
                        />
                      );
                    case "linkButton":
                      item.isSelected = !item?.styles?.IsDisabled && IsSelected;
                      item.hoverColor = theme?.items?.hoverColor || "#FAAD2C";
                      item.hoverType = theme?.items?.hoverStyle || "complete";
                      item.paddingIsActive = theme?.padding || false;
                      return (
                        <LinkButton
                          key={id}
                          {...item}
                          titleFont={theme.fonts.itemTitle}
                        />
                      );
                    case "checkbox":
                      item.isSelected = !item?.styles?.IsDisabled && IsSelected;
                      item.hoverColor = theme?.items?.hoverColor || "#FAAD2C";
                      item.hoverType = theme?.items?.hoverStyle || "complete";
                      item.paddingIsActive = theme?.padding || false;
                      return (
                        <Checkbox
                          key={id}
                          {...item}
                          titleFont={theme.fonts.itemTitle}
                        />
                      );
                    case "slider":
                      item.isSelected = !item?.styles?.IsDisabled && IsSelected;
                      item.hoverColor = theme?.items?.hoverColor || "#FAAD2C";
                      item.hoverType = theme?.items?.hoverStyle || "complete";
                      item.paddingIsActive = theme?.padding || false;
                      return (
                        <Slider
                          key={id}
                          {...item}
                          titleFont={theme.fonts.itemTitle}
                          rightLabelFont={theme.fonts.itemRightLabel}
                        />
                      );
                    case "list":
                      item.isSelected = !item?.styles?.IsDisabled && IsSelected;
                      item.hoverColor = theme?.items?.hoverColor || "#FAAD2C";
                      item.hoverType = theme?.items?.hoverStyle || "complete";
                      item.paddingIsActive = theme?.padding || false;
                      return (
                        <List
                          key={id}
                          {...item}
                          titleFont={theme.fonts.itemTitle}
                          rightLabelFont={theme.fonts.itemRightLabel}
                        />
                      );
                    case "colorList":
                      item.isSelected = !item?.styles?.IsDisabled && IsSelected;
                      item.hoverColor = theme?.items?.hoverColor || "#FAAD2C";
                      item.hoverType = theme?.items?.hoverStyle || "complete";
                      item.paddingIsActive = theme?.padding || false;
                      return (
                        <ColorList
                          key={id}
                          {...item}
                          titleFont={theme.fonts.itemTitle}
                          rightLabelFont={theme.fonts.itemRightLabel}
                        />
                      );
                  }
                })}
            </div>
            {theme.displayControlsIndicator && (
              <div
                id="zUI-ControlsIndicator"
                style={{
                  borderRadius: `${theme?.padding ? 0.5 : 0}em`,
                  backgroundColor: theme?.colors?.controlsIndicator,
                }}
              >
                <svg
                  width="12"
                  height="21"
                  viewBox="0 0 12 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 14L6 19L11 14M11 7L6 2L1 7"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            )}
            <>
              <AnimatePresence>
                {description && description.length > 1 && (
                  <motion.div
                    key={description}
                    id="zUI-MenuItemsDescription"
                    initial={{
                      minHeight: "0vh",
                      maxHeight: "0vh",
                      opacity: 0,
                      y: -20,
                    }}
                    animate={{
                      minHeight: "4vh",
                      maxHeight: "auto",
                      opacity: 1,
                      y: 0,
                    }}
                    exit={{
                      minHeight: "0vh",
                      maxHeight: "0vh",
                      opacity: 0,
                      y: -20,
                    }}
                    transition={{ duration: 0.5 }}
                    style={{
                      fontFamily: `${extractFontName(
                        theme?.fonts?.counter
                      )}, sans-serif`,
                      fontWeight: extractFontWeight(theme?.fonts?.description),
                    }}
                  >
                    {formatString(description)}
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          </div>
          {infosIsVisible && (
            <div
              id="zUI-InfosPanel"
              style={{
                backgroundColor: theme?.colors?.background,
                borderRadius: `${theme?.cornersRadius}em`,
                boxShadow: theme?.perspective
                  ? `${
                      theme?.position === "left" ? -0.25 : 0.25
                    }vw 0 10px rgba(0, 0, 0, 0.5)`
                  : "none",
                transform: theme?.perspective
                  ? `rotateY(${
                      theme?.position === "left" ? 20 : -20
                    }deg) translateX(${theme?.position === "left" ? 1 : -1}vw)`
                  : "none",
              }}
            >
              {infoPanelTitle && infoPanelTitle.length > 1 && (
                <h1
                  style={{
                    color: "white",
                    fontFamily: `${extractFontName(
                      theme?.fonts?.infoPanelTitle
                    )}, sans-serif`,
                    fontWeight: extractFontWeight(theme?.fonts?.infoPanelTitle),
                  }}
                >
                  {formatString(infoPanelTitle)}
                </h1>
              )}
              {infoPanelBanner && isUrl(infoPanelBanner) && (
                <img
                  src={infoPanelBanner}
                  style={{
                    width: "100%",
                  }}
                />
              )}
              {informations &&
                informations.map((info) => {
                  return (
                    <div className="zUI-Info">
                      {info.map((content) => {
                        return (
                          <div
                            style={{
                              color: "white",
                              fontFamily: `${extractFontName(
                                theme?.fonts?.info
                              )}, sans-serif`,
                              fontWeight: extractFontWeight(theme?.fonts?.info),
                            }}
                          >
                            {formatString(content)}
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Menu;
