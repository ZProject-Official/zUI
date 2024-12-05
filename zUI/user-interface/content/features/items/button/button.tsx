// Assets
import LockedIcon from "../../../assets/badges/shop_lock.png";

// Props
import { ButtonProps } from "../../menu/props";

// Functions
import isUrl from "../../../utils/functions/isUrl";
import findBadge from "../../../utils/functions/findBadge";
import formatString from "../../../utils/functions/formatString";
import extractFontName from "../../../utils/functions/extractFontName";
import extractFontWeight from "../../../utils/functions/extractFontWeight";
import { isEnvBrowser } from "../../../utils/misc";
import { useState, useEffect } from "react";
import fetchNui from "../../../hooks/fetchNui";

function Button({
  title,
  description,
  styles,
  actionId,
  isSelected,
  hoverType,
  hoverColor,
  paddingIsActive,
  rightLabelFont,
  titleFont,
  hoverEvent,
  setDescription,
}: ButtonProps) {
  let hoverStyle: React.CSSProperties = {};
  const [itemIsSelected, setItemIsSelected] = useState<boolean>(isSelected);
  const [hoverInterval, setHoverInterval] = useState<number | null>(null);

  hoverStyle.borderRadius = `${paddingIsActive ? 0.5 : 0}em`;
  hoverStyle.backgroundColor = "rgba(0, 0, 0, 0.5)";
  switch (hoverType) {
    case "complete":
      hoverStyle.background = hoverColor;
      break;
    case "rod":
      hoverStyle.background = styles.Color;
      hoverStyle.borderLeft = `solid 0.25vw ${hoverColor}`;
      break;
    case "neon":
      hoverStyle.background = `linear-gradient(to top, ${hoverColor}, transparent)`;
      break;
  }

  useEffect(() => {
    setItemIsSelected(isSelected);
  }, [isSelected]);

  return (
    <div
      onMouseEnter={() => {
        if (hoverEvent) {
          setItemIsSelected(true);
          setDescription(description);
          fetchNui("zUI-PlaySound", { Type: "up" });
          const intervalId = window.setInterval(() => {
            fetchNui("zUI-Hover", { actionId: actionId });
          }, 100);
          setHoverInterval(intervalId);
        }
      }}
      onMouseLeave={() => {
        if (hoverEvent) {
          setDescription("");
          setItemIsSelected(false);
          if (hoverInterval) {
            clearInterval(hoverInterval);
            setHoverInterval(null);
          }
        }
      }}
      onClick={() => {
        if (hoverEvent && actionId) {
          fetchNui("zUI-UseButton", actionId);
          fetchNui("zUI-PlaySound", { Type: "enter" });
          if (hoverInterval) {
            clearInterval(hoverInterval);
            setHoverInterval(null);
          }
        }
      }}
      className="zUI-Item"
      style={
        itemIsSelected
          ? hoverStyle
          : {
              background:
                styles.Color ||
                `${paddingIsActive ? "rgba(0, 0, 0, 0.5)" : "none"}`,
              borderRadius: `${paddingIsActive ? 0.5 : 0}em`,
            }
      }
    >
      {itemIsSelected && isUrl(hoverType) && (
        <img className="zUI-ImageHover" src={hoverType} alt="hover" />
      )}
      <div className="zUI-ContentWrapper">
        <div className="zUI-ItemLeftZone">
          {styles.LeftBadge && (
            <img
              className="zUI-Badge"
              src={findBadge(styles.LeftBadge)}
              alt="Left Badge"
            />
          )}
          <h1
            className="zUI-ItemTitle"
            style={{
              color: itemIsSelected ? "white" : "lightgrey",
              fontFamily: `${extractFontName(titleFont)}, sans-serif`,
              fontWeight: extractFontWeight(titleFont),
            }}
          >
            {formatString(title)}
          </h1>
        </div>
        <div className="zUI-ItemRightZone">
          {styles.RightLabel && (
            <h1
              className="zUI-ItemRightLabel"
              style={{
                color: itemIsSelected ? "white" : "lightgrey",
                fontFamily: `${extractFontName(rightLabelFont)}, sans-serif`,
                fontWeight: extractFontWeight(rightLabelFont),
              }}
            >
              {formatString(styles.RightLabel)}
            </h1>
          )}
          {styles.RightBadge && (
            <img
              className="zUI-Badge"
              src={findBadge(styles.RightBadge)}
              alt="Right Badge"
            />
          )}
          {styles.IsDisabled && (
            <img src={LockedIcon} className="zUI-Badge" alt="lock" />
          )}
        </div>
      </div>
    </div>
  );
}

export default Button;
