import { useState, useEffect } from "react";

// Utils
import findBadge from "../../../utils/findBadge";
import formatString from "../../../utils/formatString";
import { fetchNui } from "../../../utils/fetchNui";

// Icons
import LockedIcon from "../../../assets/icons/locked.svg";
import NextIcon from "../../../assets/icons/next.svg";
import LastIcon from "../../../assets/icons/last.svg";

// Interfaces
interface ListInterface {
  Title: string;
  Items: string[];
  Styles: {
    IsDisabled?: boolean;
    Color?: string;
    HoverColor?: string;
    LeftBadge?: string;
  };
  IsSelected?: boolean;
  ActionId: string;
  HoverType: string;
}

function List({
  Title,
  Items,
  Styles,
  IsSelected,
  ActionId,
  HoverType,
}: ListInterface) {
  const [CurrentIndex, SetCurrentIndex] = useState<number>(0);

  useEffect(() => {
    const handleMessage = (event: any) => {
      if (event.data.type === "UPDATE_LIST" && event.data.id === ActionId) {
        if (!Styles.IsDisabled) {
          let newIndex = CurrentIndex;
          if (event.data.action === "right") {
            if (CurrentIndex < Items.length - 1) {
              newIndex = CurrentIndex + 1;
            } else {
              newIndex = 0;
            }
            SetCurrentIndex(newIndex);
          } else if (event.data.action === "left") {
            if (CurrentIndex > 0) {
              newIndex = CurrentIndex - 1;
            } else {
              newIndex = Items.length - 1;
            }
            SetCurrentIndex(newIndex);
          }
          if (event.data.action === "right" || event.data.action === "left") {
            fetchNui("zUI-UseList", {
              ActionId: ActionId,
              ListChange: true,
              Selected: false,
              Index: newIndex + 1,
            });
          } else if (event.data.action === "enter") {
            fetchNui("zUI-UseList", {
              ActionId: ActionId,
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
  }, [ActionId, CurrentIndex, Items.length, Styles.IsDisabled]);

  return (
    <div
      className="zUI-Item"
      style={
        IsSelected
          ? HoverType === "complete"
            ? {
                background: Styles.HoverColor,
              }
            : {
                background: Styles.Color,
                borderLeft: `solid 0.25vw ${Styles.HoverColor}`,
              }
          : Styles.Color
          ? {
              background: Styles.Color,
            }
          : undefined
      }
    >
      <div className="zUI-ItemLeftZone">
        {Styles.LeftBadge && (
          <img src={findBadge(Styles.LeftBadge)} className="zUI-Badge" />
        )}
        <h1 className="zUI-ItemTitle">{formatString(Title)}</h1>
      </div>
      <div className="zUI-ItemRightZone">
        <div className="zUI-ListCarousel">
          <img src={LastIcon} className="zUI-ListIcon" />
          <h1 className="zUI-ListItem">{formatString(Items[CurrentIndex])}</h1>
          <img src={NextIcon} className="zUI-ListIcon" />
        </div>
        {Styles.IsDisabled && (
          <img src={LockedIcon} className="zUI-LockedIcon" />
        )}
      </div>
    </div>
  );
}

export default List;
