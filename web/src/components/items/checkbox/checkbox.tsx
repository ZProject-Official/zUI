import findBadge from "../../../utils/findBadge";
import formatString from "../../../utils/formatString";
import isUrl from "../../../utils/isUrl";

import LockedIcon from "../../../assets/icons/locked.svg";

interface CheckboxProps {
  title: string;
  styles: {
    LeftBadge?: string;
    IsDisabled?: boolean;
    Color?: string;
  };
  state: boolean;
  isSelected: boolean;
  hoverType: "complete" | "rod" | "neon";
  defaultColor: string;
}

function Checkbox({
  title,
  styles,
  isSelected,
  state,
  hoverType,
  defaultColor,
}: CheckboxProps) {
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
          <input
            type="checkbox"
            className="zUI-Checkbox"
            style={
              state && !styles.IsDisabled
                ? {
                    backgroundColor: defaultColor,
                  }
                : {}
            }
            checked={state}
            disabled={styles.IsDisabled}
          />
          {styles.IsDisabled && (
            <img src={LockedIcon} className="zUI-LockedIcon" />
          )}
        </div>
      </div>
    </div>
  );
}

export default Checkbox;
