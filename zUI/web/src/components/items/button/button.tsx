import Locked from "../../../assets/icons/locked.svg";
import findBadge from "../../../utils/findBadge";
import formatString from "../../../utils/formatString";

interface ButtonInterface {
  Label: string;
  Styles: {
    leftBadge?: string;
    rightBadge?: string;
    rightLabel?: string;
    isDisabled?: boolean;
    color?: string;
    hoverColor?: string;
  };
  onHovered?: boolean;
}

function Button({ Label, Styles, onHovered }: ButtonInterface) {
  return (
    <div
      className={`button${onHovered ? "-hovered" : ""}`}
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
        {Styles.rightLabel ? (
          <h1 id={`item-rightlabel${Styles.isDisabled ? "-locked" : ""}`}>
            {formatString(Styles.rightLabel)}
          </h1>
        ) : null}
        {Styles.rightBadge ? (
          <img
            src={
              findBadge(Styles.rightBadge)
                ? findBadge(Styles.rightBadge)
                : undefined
            }
            style={{
              maxWidth: "2vw",
              marginRight: "-5%",
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

export default Button;
