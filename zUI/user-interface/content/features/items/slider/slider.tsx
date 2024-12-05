import { useEffect, useState } from "react";

// Functions
import isUrl from "../../../utils/functions/isUrl";
import formatString from "../../../utils/functions/formatString";
import fetchNui from "../../../hooks/fetchNui";
import extractFontName from "../../../utils/functions/extractFontName";
import extractFontWeight from "../../../utils/functions/extractFontWeight";

// Icons
import LockedIcon from "../../../assets/badges/shop_lock.png";

// Props
import { SliderProps } from "../../menu/props";

function Slider({
  title,
  styles,
  actionId,
  isSelected,
  hoverType,
  hoverColor,
  percentage: initialPercentage,
  step,
  paddingIsActive,
  titleFont,
  rightLabelFont,
}: SliderProps) {
  const [percentage, setPercentage] = useState<number>(initialPercentage);

  useEffect(() => {
    const handleMessage = (event: any) => {
      if (event.data.type === "UPDATE_SLIDER" && event.data.id === actionId) {
        if (!styles.IsDisabled) {
          let newPercentage = percentage;

          if (event.data.action === "right") {
            newPercentage = Math.min(percentage + step, 100);
          } else if (event.data.action === "left") {
            newPercentage = Math.max(percentage - step, 0);
          }

          setPercentage(newPercentage);

          if (event.data.action === "right" || event.data.action === "left") {
            fetchNui("zUI-UseSlider", {
              actionId: actionId,
              change: true,
              percentage: newPercentage,
            });
          } else if (event.data.action === "enter") {
            fetchNui("zUI-UseSlider", {
              actionId: actionId,
              selected: true,
              percentage: newPercentage,
            });
          }
        }
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [actionId, styles.IsDisabled, percentage, step]);

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
        <img className="zUI-ImageHover" src={hoverType} alt="hover" />
      )}
      <div className="zUI-ContentWrapper">
        <div className="zUI-ItemLeftZone">
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
          {styles?.ShowPercentage && (
            <h1
              className="zUI-TextPercentage"
              style={{
                color: isSelected ? "white" : "lightgrey",
                fontFamily: `${extractFontName(rightLabelFont)}, sans-serif`,
                fontWeight: extractFontWeight(rightLabelFont),
              }}
            >
              {percentage}%
            </h1>
          )}
          <div className="zUI-PercentageBar">
            <div
              className="zUI-Percentage"
              style={{
                background: "white",
                height: "100%",
                borderRadius: "100em",
                width: `${percentage}%`,
                transition: "0.5s",
              }}
            ></div>
          </div>
          {styles.IsDisabled && (
            <img src={LockedIcon} className="zUI-LockedIcon" alt="lock" />
          )}
        </div>
      </div>
    </div>
  );
}

export default Slider;
