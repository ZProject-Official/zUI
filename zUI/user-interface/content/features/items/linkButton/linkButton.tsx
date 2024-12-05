import { useState, useEffect } from "react";
import findBadge from "../../../utils/functions/findBadge";
import formatString from "../../../utils/functions/formatString";
import isUrl from "../../../utils/functions/isUrl";
import extractFontName from "../../../utils/functions/extractFontName";
import extractFontWeight from "../../../utils/functions/extractFontWeight";
import LockedIcon from "../../../assets/badges/shop_lock.png";
import LinkIcon from "../../../assets/icons/link.svg";
import fetchNui from "../../../hooks/fetchNui";
import { LinkButtonProps } from "../../menu/props";

function LinkButton({
  title,
  description,
  styles,
  isSelected,
  hoverType,
  hoverColor,
  paddingIsActive,
  titleFont,
  link,
  setDescription,
}: LinkButtonProps) {
  let hoverStyle: React.CSSProperties = {};
  const [isHovered, setIsHovered] = useState(false); // état pour gérer le hover

  hoverStyle.borderRadius = `${paddingIsActive ? 0.5 : 0}em`;
  hoverStyle.backgroundColor = "rgba(0, 0, 0, 0.5)";

  switch (hoverType) {
    case "complete":
      hoverStyle.background = hoverColor;
      break;
    case "rod":
      hoverStyle.background = styles.Color;
      hoverStyle.borderLeft = `solid 0.25vw ${hoverColor}`;
      break;
    case "neon":
      hoverStyle.background = `linear-gradient(to top, ${hoverColor}, transparent)`;
      break;
  }

  const [itemIsSelected, setItemIsSelected] = useState<boolean>(isSelected);

  useEffect(() => {
    setItemIsSelected(isSelected);
  }, [isSelected]);

  return (
    <div
      className="zUI-Item"
      style={
        isHovered || itemIsSelected
          ? hoverStyle
          : {
              background:
                styles.Color ||
                `${paddingIsActive ? "rgba(0, 0, 0, 0.5)" : "none"}`,
              borderRadius: `${paddingIsActive ? 0.5 : 0}em`,
            }
      }
      onMouseEnter={() => {
        setDescription(description);
        setIsHovered(true);
        fetchNui("zUI-PlaySound", { Type: "up" });
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        setDescription("");
      }}
      onClick={() => {
        fetchNui("zUI-PlaySound", { Type: "enter" });
        // @ts-ignore
        window.invokeNative("openUrl", link);
      }}
    >
      {isHovered && isUrl(hoverType) && (
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
              color: itemIsSelected ? "white" : "lightgrey",
              fontFamily: `${extractFontName(titleFont)}, sans-serif`,
              fontWeight: extractFontWeight(titleFont),
            }}
          >
            {formatString(title)}
          </h1>
        </div>
        <div className="zUI-ItemRightZone">
          <img src={LinkIcon} className="zUI-Badge" />
          {styles.IsDisabled && (
            <img src={LockedIcon} className="zUI-LockedIcon" />
          )}
        </div>
      </div>
    </div>
  );
}

export default LinkButton;
