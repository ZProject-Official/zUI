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

import "./colorList.css";

function ColorList({
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
  const [CurrentIndex, SetCurrentIndex] = useState<number>(index);
  const [selectedCircle, setSelectedCircle] = useState<number>(0);
  const [animating, setAnimating] = useState<boolean>(false);

  useEffect(() => {
    SetCurrentIndex(index);
  });

  const displayedColors = [
    ...items.slice(CurrentIndex, CurrentIndex + 3),
    ...items.slice(0, Math.max(0, 3 - (items.length - CurrentIndex))),
  ];

  const handleCircleNavigation = (direction: "left" | "right") => {
    let newIndex = selectedCircle;
    if (direction === "right") {
      newIndex = selectedCircle < 2 ? selectedCircle + 1 : 2;
    } else if (direction === "left") {
      newIndex = selectedCircle > 0 ? selectedCircle - 1 : 0;
    }
    setSelectedCircle(newIndex);
    setAnimating(true);
  };

  useEffect(() => {
    if (animating) {
      const timeout = setTimeout(() => {
        setAnimating(false);
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [animating]);

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
            <div className="zUI-ColorCarousel">
              {displayedColors.map((color, index) => {
                return (
                  <div
                    key={index}
                    className={`zUI-ColorCircle ${
                      selectedCircle === index && animating ? "selected" : ""
                    }`}
                    style={{
                      backgroundColor: color,
                      width: "20px",
                      height: "20px",
                      borderRadius: "50%",
                      margin: "5px",
                      border:
                        selectedCircle === index ? "2px solid white" : "none",
                    }}
                    onClick={() => setSelectedCircle(index)}
                  ></div>
                );
              })}
            </div>
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

export default ColorList;
