import { act, useEffect, useState } from "react";
import Locked from "../../../assets/icons/locked.svg";
import findBadge from "../../../utils/findBadge";
import { fetchNui } from "../../../utils/fetchNui";
import formatString from "../../../utils/formatString";
import CheckedIcon from "../../../assets/icons/checked.svg";

interface CheckboxInterface {
  Label: string;
  Styles: {
    leftBadge?: string;
    isDisabled?: boolean;
    color?: string;
    hoverColor?: string;
    checkedColor?: string;
  };
  onHovered?: boolean;
  defaultState: boolean;
  actionId?: string;
}

function Checkbox({
  Label,
  Styles,
  onHovered,
  defaultState,
  actionId,
}: CheckboxInterface) {
  const [isChecked, setIsChecked] = useState<boolean>(defaultState);

  useEffect(() => {
    const handleMessage = (event: any) => {
      if (event.data.type === "UPDATE_CHECKBOX" && event.data.id === actionId) {
        setIsChecked(!isChecked);
        fetchNui("zUI-ActionCheckbox", { actionId, isChecked: !isChecked });
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [actionId, isChecked]);
  return (
    <div
      className={`checkbox${onHovered ? "-hovered" : ""}`}
      style={{
        backgroundColor: !onHovered
          ? Styles.color || "rgba(18, 18, 18, 0.5)"
          : Styles.hoverColor || "#FAAD2C",
      }}
    >
      <div className="leftzone">
        {Styles.leftBadge ? (
          <img
            src={
              findBadge(Styles.leftBadge)
                ? findBadge(Styles.leftBadge)
                : undefined
            }
            style={{
              maxWidth: "2vw",
              marginLeft: "-5%",
            }}
          />
        ) : null}
        <h1 id={`item-label${Styles.isDisabled ? "-locked" : ""}`}>
          {formatString(Label)}
        </h1>
      </div>
      <div className="rightzone">
        <input
          type="checkbox"
          id="btn-checkbox"
          className="custom-checkbox"
          style={
            isChecked && !Styles.isDisabled
              ? {
                  backgroundColor: Styles.checkedColor
                    ? Styles.checkedColor
                    : "#FAAD2C",
                }
              : {}
          }
          checked={isChecked}
          disabled={Styles.isDisabled}
        />
        {!Styles.isDisabled ? (
          <img
            src={CheckedIcon}
            alt="Checked Icon"
            className="checked-icon"
            style={{
              position: "absolute",
              width: "0.75vh",
              height: "0.75vh",
            }}
          />
        ) : null}
        {Styles.isDisabled ? (
          <img
            src={Locked}
            style={{
              maxWidth: "4%",
              height: "auto",
            }}
          />
        ) : null}
      </div>
    </div>
  );
}

export default Checkbox;
