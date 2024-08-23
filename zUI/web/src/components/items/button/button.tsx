// Images
import LockedIcon from "../../../assets/icons/locked.svg";

// Utils
import findBadge from "../../../utils/findBadge";
import formatString from "../../../utils/formatString";

// Interfaces

interface ButtonInterface {
  Title: string;
  Styles: {
    LeftBadge?: string;
    RightBadge?: string;
    RightLabel?: string;
    IsDisabled?: boolean;
    Color?: string;
    HoverColor?: string;
  };
  ActionId: string;
  IsSelected?: boolean;
}

function Button({ Title, Styles, IsSelected }: ButtonInterface) {
  return (
    <div
      className="zUI-Item"
      style={
        IsSelected
          ? {
              background: Styles.HoverColor,
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
        <h1 className="zUI-ItemRightLabel">
          {Styles.RightLabel && formatString(Styles.RightLabel)}
        </h1>
        {Styles.RightBadge && (
          <img src={findBadge(Styles.RightBadge)} className="zUI-Badge" />
        )}
        {Styles.IsDisabled && (
          <img src={LockedIcon} className="zUI-LockedIcon" />
        )}
      </div>
    </div>
  );
}

export default Button;
