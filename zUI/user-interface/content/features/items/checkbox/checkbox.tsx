import { useState, useEffect } from "react";
import findBadge from "../../../utils/functions/findBadge";
import formatString from "../../../utils/functions/formatString";
import isUrl from "../../../utils/functions/isUrl";
import extractFontName from "../../../utils/functions/extractFontName";
import extractFontWeight from "../../../utils/functions/extractFontWeight";
import LockedIcon from "../../../assets/badges/shop_lock.png";
import { CheckboxProps } from "../../menu/props";
import fetchNui from "../../../hooks/fetchNui";

function Checkbox({
  title,
  description,
  styles,
  isSelected,
  state,
  hoverType,
  hoverColor,
  paddingIsActive,
  titleFont,
  actionId,
  setDescription,
}: CheckboxProps) {
  let hoverStyle: React.CSSProperties = {};
  const [isHovered, setIsHovered] = useState(false);

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

  const [itemIsSelected, setItemIsSelected] = useState<boolean>(isSelected);
  const [hoverInterval, setHoverInterval] = useState<number | null>(null);

  useEffect(() => {
    setItemIsSelected(isSelected);
  }, [isSelected]);

  return (
    <div
      className="zUI-Item"
      style={
        isHovered || itemIsSelected
          ? hoverStyle
          : {
              background:
                styles.Color ||
                `${paddingIsActive ? "rgba(0, 0, 0, 0.5)" : "none"}`,
              borderRadius: `${paddingIsActive ? 0.5 : 0}em`,
            }
      }
      onMouseEnter={() => {
        setDescription(description);
        setIsHovered(true);
        fetchNui("zUI-PlaySound", { Type: "up" });
        const intervalId = window.setInterval(() => {
          fetchNui("zUI-Hover", { actionId: actionId });
        }, 100);
        setHoverInterval(intervalId);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        setDescription("");
        if (hoverInterval) {
          clearInterval(hoverInterval);
          setHoverInterval(null);
        }
      }}
      onClick={() => {
        fetchNui("zUI-PlaySound", { Type: "enter" });
        fetchNui("zUI-UseCheckbox", actionId);
      }}
    >
      {isHovered && isUrl(hoverType) && (
        <img className="zUI-ImageHover" src={hoverType} />
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
          <input
            type="checkbox"
            className="zUI-Checkbox"
            style={
              state && !styles.IsDisabled
                ? {
                    backgroundColor: hoverColor,
                  }
                : {}
            }
            checked={state}
            disabled={styles.IsDisabled}
          />
          {styles.IsDisabled && (
            <img src={LockedIcon} className="zUI-LockedIcon" />
          )}
        </div>
      </div>
    </div>
  );
}

export default Checkbox;
