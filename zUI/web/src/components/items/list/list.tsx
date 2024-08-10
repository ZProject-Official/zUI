import { useState, useEffect } from "react";
import { fetchNui } from "../../../utils/fetchNui";
import Locked from "../../../assets/icons/locked.svg";
import Last from "../../../assets/icons/last.svg";
import Next from "../../../assets/icons/next.svg";
import formatString from "../../../utils/formatString";

interface ListInterface {
  Label: string;
  Items: string[];
  Styles: {
    isDisabled?: boolean;
    color?: string;
    hoverColor?: string;
  };
  onHovered?: boolean;
  actionId?: string;
}

function List({ Label, Items, Styles, onHovered, actionId }: ListInterface) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    const handleMessage = (event: any) => {
      if (event.data.type === "UPDATE_LIST" && event.data.id === actionId) {
        if (event.data.action === "right") {
          if (currentIndex < Items.length - 1) {
            setCurrentIndex(currentIndex + 1);
          } else {
            setCurrentIndex(0);
          }
        } else if (event.data.action === "left") {
          if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
          } else {
            setCurrentIndex(Items.length - 1);
          }
        } else if (event.data.action === "enter") {
          fetchNui("zUI-ActionList", { id: actionId, index: currentIndex });
        }
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [actionId, currentIndex]);

  return (
    <div
      className={`list${onHovered ? "-hovered" : ""}`}
      style={{
        backgroundColor: !onHovered
          ? Styles.color || "rgba(18, 18, 18, 0.5)"
          : Styles.hoverColor || "#FAAD2C",
      }}
    >
      <div className="leftzone">
        <h1 id={`item-label${Styles.isDisabled ? "-locked" : ""}`}>
          {formatString(Label)}
        </h1>
      </div>
      <div className="rightzone">
        <div className="carousel">
          <img
            src={Last}
            alt=""
            style={{
              width: "0.5vw",
              transition: "0.5s",
            }}
          />
          <h1 className="listItem">{formatString(Items[currentIndex])}</h1>
          <img
            src={Next}
            alt=""
            style={{
              width: "0.5vw",
              transition: "0.5s",
            }}
          />
        </div>
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

export default List;
