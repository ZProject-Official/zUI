import { useEffect, useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";

// Functions
import fetchNui from "../../hooks/fetchNui";
import useNuiEvent from "../../hooks/useNuiEvent";
import { getAnimation } from "./animations";
import extractFontName from "../../utils/functions/extractFontName";
import extractFontWeight from "../../utils/functions/extractFontWeight";

// Props
import { ContextProps, ThemeProps, ItemProps } from "./props";

// DefaultTheme
import defaultTheme from "./defaultTheme.json";

// Items
import Button from "../items/button/button";
import Line from "../items/line/line";
import Separator from "../items/separator/separator";
import LinkButton from "../items/linkButton/linkButton";
import Checkbox from "../items/checkbox/checkbox";

// StyleSheets
import "./context.css";
import formatString from "../../utils/functions/formatString";

function Context() {
  const [visible, setVisible] = useState<boolean>(false);
  const [items, setItems] = useState<ItemProps[]>([]);
  const [description, setDescription] = useState<string>("");
  const [theme, setTheme] = useState<ThemeProps>(defaultTheme as ThemeProps);
  const [themeIsReceived, setThemeIsReceived] = useState<boolean>(false);
  const [positionX, setPositionX] = useState<number>(0);
  const [positionY, setPositionY] = useState<number>(0);

  useEffect(() => {
    if (!themeIsReceived) {
      fetchNui("zUI-GetContextTheme", {});
    }
    if (!visible) {
      setDescription("");
    }
  }, [themeIsReceived, visible]);

  // Nui Events
  useNuiEvent<ThemeProps>("zUI-SetContextTheme", (data) => {
    setTheme(data);
    if (data !== null || data !== undefined) {
      setThemeIsReceived(true);
    }
  });

  useNuiEvent("zUI-ManageContext", (data: ContextProps) => {
    setVisible(data.Visible);
    if (data.Position) {
      setPositionX(data.Position.x * 100);
      setPositionY(data.Position.y * 100);
    }
    if (data.Items) {
      setItems(data.Items);
    }
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Alt") {
        if (visible) {
          fetchNui("zUI-DisableFocus");
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [visible]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const contextMenuElement = document.getElementById("zUI-ContextMenu");
      if (
        visible &&
        contextMenuElement &&
        !contextMenuElement.contains(e.target as Node)
      ) {
        fetchNui("zUI-UpdateContext");
      }
    };

    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={getAnimation(theme.animations).initialAnim}
          animate={getAnimation(theme.animations).animateAnim}
          exit={getAnimation(theme.animations).exitAnim}
          transition={{ duration: 0.5 }}
          style={{
            position: "absolute",
            left: `${positionX}%`,
            top: `${positionY}%`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1vh",
          }}
        >
          <div
            id="zUI-ContextMenu"
            style={{
              padding: theme?.padding ? "0.75%" : "none",
              gap: theme?.padding ? "1vh" : "none",
              backgroundColor: theme?.colors?.background,
              borderRadius: `${theme?.cornersRadius}em`,
            }}
          >
            <div
              id="zUI-ContextMenuItemsContainer"
              style={{
                gap: `${theme?.padding ? "1vh" : "0"}`,
              }}
            >
              {items &&
                items.length > 0 &&
                items.map((item, id) => {
                  switch (item.type) {
                    case "button":
                      item.hoverColor = theme?.items?.hoverColor || "#FAAD2C";
                      item.hoverType = theme?.items?.hoverStyle || "complete";
                      item.paddingIsActive = theme?.padding || false;
                      return (
                        <Button
                          key={id}
                          {...item}
                          titleFont={theme.fonts.itemTitle}
                          rightLabelFont={theme.fonts.itemRightLabel}
                          setDescription={(value) => {
                            setDescription(value);
                          }}
                          hoverEvent
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
                      item.hoverColor = theme?.items?.hoverColor || "#FAAD2C";
                      item.hoverType = theme?.items?.hoverStyle || "complete";
                      item.paddingIsActive = theme?.padding || false;
                      return (
                        <LinkButton
                          key={id}
                          {...item}
                          titleFont={theme.fonts.itemTitle}
                          setDescription={(value) => {
                            setDescription(value);
                          }}
                        />
                      );
                    case "checkbox":
                      item.hoverColor = theme?.items?.hoverColor || "#FAAD2C";
                      item.hoverType = theme?.items?.hoverStyle || "complete";
                      item.paddingIsActive = theme?.padding || false;
                      return (
                        <Checkbox
                          key={id}
                          {...item}
                          titleFont={theme.fonts.itemTitle}
                          setDescription={(value) => {
                            setDescription(value);
                          }}
                        />
                      );
                    case "subMenu":
                      item.hoverColor = theme?.items?.hoverColor || "#FAAD2C";
                      item.hoverType = theme?.items?.hoverStyle || "complete";
                      item.paddingIsActive = theme?.padding || false;
                  }
                })}
            </div>
          </div>
          <AnimatePresence>
            {description && description.length > 1 && (
              <motion.div
                id="zUI-ContextDescription"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{
                  backgroundColor: theme?.colors?.background,
                  borderRadius: `${theme?.cornersRadius}em`,
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
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Context;
