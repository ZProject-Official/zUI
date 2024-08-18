import { useState, useEffect } from "react";

// Config
import Config from "../../../../../config.json";

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
}

function List({ Title, Items, Styles, IsSelected, ActionId }: ListInterface) {
  const [CurrentIndex, SetCurrentIndex] = useState<number>(0);

  useEffect(() => {
    const handleMessage = (event: any) => {
      if (event.data.type === "UPDATE_LIST" && event.data.id === ActionId) {
        if (!Styles.IsDisabled) {
          if (event.data.action === "right") {
            if (CurrentIndex < Items.length - 1) {
              SetCurrentIndex(CurrentIndex + 1);
            } else {
              SetCurrentIndex(0);
            }
          } else if (event.data.action === "left") {
            if (CurrentIndex > 0) {
              SetCurrentIndex(CurrentIndex - 1);
            } else {
              SetCurrentIndex(Items.length - 1);
            }
          } else if (event.data.action === "enter") {
            fetchNui("zUI-UseList", {
              ActionId: ActionId,
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
  }, [ActionId, CurrentIndex]);

  return (
    <div
      className="zUI-Item"
      style={
        IsSelected
          ? {
              background: Styles.HoverColor || Config.DefaultColor,
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
