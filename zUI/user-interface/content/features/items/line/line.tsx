// Props
import { LineProps } from "../../menu/props";

function Line({ defaultColor, rounded, colors, paddingIsActive }: LineProps) {
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
        className="zUI-Line"
        style={{
          background:
            colors && colors.length > 1
              ? `linear-gradient(to right, ${colors.join(", ")})`
              : colors && colors.length === 1
              ? colors[0]
              : defaultColor,
          borderRadius: rounded ? "100em" : "none",
        }}
      ></div>
    </div>
  );
}

export default Line;
