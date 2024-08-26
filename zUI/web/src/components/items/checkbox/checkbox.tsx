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
interface CheckboxInterface {
  Title: string;
  DefaultState: boolean;
  Styles: {
    IsDisabled?: boolean;
    Color?: string;
    HoverColor?: string;
    LeftBadge?: string;
    CheckedColor?: string;
  };
  IsSelected?: boolean;
  ActionId: string;
  DefaultColor: string;
  HoverType: string;
}

function Checkbox({
  Title,
  DefaultState,
  Styles,
  IsSelected,
  ActionId,
  DefaultColor,
  HoverType,
}: CheckboxInterface) {
  useEffect(() => {
    const handleMessage = (event: any) => {
      if (event.data.type === "UPDATE_CHECKBOX" && event.data.id === ActionId) {
        if (!Styles.IsDisabled) {
          fetchNui("zUI-UseCheckbox", {
            ActionId: ActionId,
            State: !DefaultState,
          });
        }
      }
    };
    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [ActionId]);

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
      <div className="zUI-ItemRightZone">
        {Styles.LeftBadge && (
          <img src={findBadge(Styles.LeftBadge)} className="zUI-Badge" />
        )}
        <h1 className="zUI-ItemTitle">{formatString(Title)}</h1>
      </div>
      <div className="zUI-ItemRightZone">
        <input
          type="checkbox"
          className="zUI-Checkbox"
          style={
            DefaultState && !Styles.IsDisabled
              ? {
                  backgroundColor: Styles.CheckedColor || DefaultColor,
                }
              : {}
          }
          checked={DefaultState}
          disabled={Styles.IsDisabled}
        />
        {Styles.IsDisabled && (
          <img src={LockedIcon} className="zUI-LockedIcon" />
        )}
      </div>
    </div>
  );
}

export default Checkbox;
