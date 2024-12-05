import { useEffect, useState } from "react";

// Functions
import formatString from "../../../utils/functions/formatString";
import fetchNui from "../../../hooks/fetchNui";
import isUrl from "../../../utils/functions/isUrl";
import findBadge from "../../../utils/functions/findBadge";
import extractFontName from "../../../utils/functions/extractFontName";
import extractFontWeight from "../../../utils/functions/extractFontWeight";

// Icons
import NextIcon from "../../../assets/icons/next.svg";
import LastIcon from "../../../assets/icons/last.svg";
import LockedIcon from "../../../assets/badges/shop_lock.png";

// Props
import { ListProps } from "../../menu/props";

function List({
  title,
  styles,
  isSelected,
  hoverType,
  items,
  actionId,
  hoverColor,
  paddingIsActive,
  titleFont,
  rightLabelFont,
  index,
}: ListProps) {
  const CurrentIndex: number = index;

  let hoverStyle: React.CSSProperties = {};

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

  return (
    <div
      className="zUI-Item"
      style={
        isSelected
          ? hoverStyle
          : {
              background:
                styles.Color ||
                `${paddingIsActive ? "rgba(0, 0, 0, 0.5)" : "none"}`,
              borderRadius: `${paddingIsActive ? 0.5 : 0}em`,
            }
      }
    >
      {isSelected && isUrl(hoverType) && (
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
              color: isSelected ? "white" : "lightgrey",
              fontFamily: `${extractFontName(titleFont)}, sans-serif`,
              fontWeight: extractFontWeight(titleFont),
            }}
          >
            {formatString(title)}
          </h1>
        </div>
        <div className="zUI-ItemRightZone">
          <div className="zUI-ListCarousel">
            <img src={LastIcon} className="zUI-ListIcon" />
            <h1
              style={{
                color: isSelected ? "white" : "lightgrey",
                fontFamily: `${extractFontName(rightLabelFont)}, sans-serif`,
                fontWeight: extractFontWeight(rightLabelFont),
              }}
            >
              {formatString(items[CurrentIndex])}
            </h1>
            <img src={NextIcon} className="zUI-ListIcon" />
          </div>
          {styles.IsDisabled && (
            <img src={LockedIcon} className="zUI-LockedIcon" />
          )}
        </div>
      </div>
    </div>
  );
}

export default List;
