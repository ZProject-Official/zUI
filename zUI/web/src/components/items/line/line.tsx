interface LineProps {
  defaultColor: string;
  rounded: boolean;
  colors?: string[];
}

function Line({ defaultColor, rounded, colors }: LineProps) {
  return (
    <div className="zUI-Item">
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
