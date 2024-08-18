// Config
import Config from "../../../../../config.json";

// Interfaces
interface LineInterface {
  Colors?: string[];
}

function Line({ Colors }: LineInterface) {
  return (
    <div className="zUI-Item">
      <div
        className="line"
        style={{
          background:
            Colors && Colors.length > 1
              ? `linear-gradient(to right, ${Colors.join(", ")})`
              : Config.DefaultColor,
        }}
      ></div>
    </div>
  );
}

export default Line;
