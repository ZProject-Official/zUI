// Function
import formatString from "../../../utils/functions/formatString";
import extractFontName from "../../../utils/functions/extractFontName";
import extractFontWeight from "../../../utils/functions/extractFontWeight";

// Props
import { SeparatorProps } from "../../menu/props";

function Separator({
  title,
  position,
  titleFont,
  paddingIsActive,
}: SeparatorProps) {
  return (
    <div
      className="zUI-Item"
      style={{
        justifyContent: "center",
        borderRadius: `${paddingIsActive ? 0.5 : 0}em`,
        backgroundColor: `${
          paddingIsActive ? "rgba(0, 0, 0, 0.5)" : "transparent"
        }`,
      }}
    >
      <div
        className="zUI-Separator"
        style={{
          justifyContent: position,
          fontFamily: `${extractFontName(titleFont)}, sans-serif`,
          fontWeight: extractFontWeight(titleFont),
        }}
      >
        <h1 className="zUI-ItemTitle">{formatString(title)}</h1>
      </div>
    </div>
  );
}

export default Separator;
