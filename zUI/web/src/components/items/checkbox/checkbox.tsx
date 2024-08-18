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
}

function Checkbox({
  Title,
  DefaultState,
  Styles,
  IsSelected,
  ActionId,
}: CheckboxInterface) {
  const [IsChecked, SetIsChecked] = useState<boolean>(DefaultState);

  useEffect(() => {
    const handleMessage = (event: any) => {
      if (event.data.type === "UPDATE_CHECKBOX" && event.data.id === ActionId) {
        if (!Styles.IsDisabled) {
          fetchNui("zUI-UseCheckbox", {
            ActionId: ActionId,
            State: !IsChecked,
          });
          SetIsChecked(!IsChecked);
        }
      }
    };
    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [ActionId, IsChecked]);

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
            IsChecked && !Styles.IsDisabled
              ? {
                  backgroundColor: Styles.CheckedColor || Config.DefaultColor,
                }
              : {}
          }
          checked={IsChecked}
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
