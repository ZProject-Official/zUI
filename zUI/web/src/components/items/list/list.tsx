import { useEffect, useState } from "react";
import { fetchNui } from "../../../utils/fetchNui";

import findBadge from "../../../utils/findBadge";
import formatString from "../../../utils/formatString";
import isUrl from "../../../utils/isUrl";

// Icons
import NextIcon from "../../../assets/icons/next.svg";
import LastIcon from "../../../assets/icons/last.svg";
import LockedIcon from "../../../assets/icons/locked.svg";

interface ListProps {
  title: string;
  styles: {
    LeftBadge?: string;
    IsDisabled?: boolean;
    Color?: string;
  };
  items: string[];
  actionId: string;
  isSelected: boolean;
  hoverType: "complete" | "rod" | "neon";
  defaultColor: string;
}

function List({
  title,
  styles,
  isSelected,
  hoverType,
  items,
  actionId,
  defaultColor,
}: ListProps) {
  const [CurrentIndex, SetCurrentIndex] = useState<number>(0);

  useEffect(() => {
    const handleMessage = (event: any) => {
      if (event.data.type === "UPDATE_LIST" && event.data.id === actionId) {
        if (!styles.IsDisabled) {
          let newIndex = CurrentIndex;
          if (event.data.action === "right") {
            if (CurrentIndex < items.length - 1) {
              newIndex = CurrentIndex + 1;
            } else {
              newIndex = 0;
            }
            SetCurrentIndex(newIndex);
          } else if (event.data.action === "left") {
            if (CurrentIndex > 0) {
              newIndex = CurrentIndex - 1;
            } else {
              newIndex = items.length - 1;
            }
            SetCurrentIndex(newIndex);
          }
          if (event.data.action === "right" || event.data.action === "left") {
            fetchNui("zUI-UseList", {
              actionId: actionId,
              ListChange: true,
              Selected: false,
              Index: newIndex + 1,
            });
          } else if (event.data.action === "enter") {
            fetchNui("zUI-UseList", {
              actionId: actionId,
              ListChange: false,
              Selected: true,
              Index: CurrentIndex + 1,
            });
          }
        }
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [actionId, CurrentIndex, items.length, styles.IsDisabled]);

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
            }}
          >
            {formatString(title)}
          </h1>
        </div>
        <div className="zUI-ItemRightZone">
          <div className="zUI-ListCarousel">
            <img src={LastIcon} className="zUI-ListIcon" />
            <h1 className="zUI-ListItem">
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
