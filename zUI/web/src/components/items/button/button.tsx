import findBadge from "../../../utils/findBadge";
import formatString from "../../../utils/formatString";
import isUrl from "../../../utils/isUrl";

import LockedIcon from "../../../assets/icons/locked.svg";
import React from "react";

interface ButtonProps {
  title: string;
  styles: {
    IsDisabled?: boolean;
    RightLabel?: string;
    RightBadge?: string;
    LeftBadge?: string;
    Color?: string;
  };
  actionId: string;
  isSelected: boolean;
  hoverType: "complete" | "rod" | "neon";
  defaultColor: string;
}

function Button({
  title,
  styles,
  actionId,
  isSelected,
  hoverType,
  defaultColor,
}: ButtonProps) {
  let hoverStyle: React.CSSProperties = {};

  switch (hoverType) {
    case "complete":
      hoverStyle.background = defaultColor;
      break;
    case "rod":
      hoverStyle.background = styles.Color;
      hoverStyle.borderLeft = `solid 0.25vw ${defaultColor}`;
      break;
    case "neon":
      hoverStyle.background = `linear-gradient(to top, ${defaultColor}, transparent)`;
      break;
  }

  return (
    <div
      className="zUI-Item"
      style={
        isSelected
          ? hoverStyle
          : {
              background: styles.Color || "none",
            }
      }
    >
      {isSelected && isUrl(hoverType) && (
        <img className="zUI-ImageHover" src={hoverType} alt="hover"/>
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
            }}
          >
            {title}
          </h1>
        </div>
        <div className="zUI-ItemRightZone">
          {styles.RightLabel && (
            <h1
              className="zUI-ItemRightLabel"
              style={{
                color: isSelected ? "white" : "lightgrey",
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
            <img src={LockedIcon} className="zUI-LockedIcon"  alt="lock"/>
          )}
        </div>
      </div>
    </div>
  );
}

export default Button;
