import formatString from "../../../utils/formatString";

interface SeparatorProps {
  title: string;
  position: string;
}

function Separator({ title, position }: SeparatorProps) {
  return (
    <div className="zUI-Item">
      <div
        className="zUI-Separator"
        style={{
          justifyContent: position,
        }}
      >
        <h1 className="zUI-ItemTitle">{formatString(title)}</h1>
      </div>
    </div>
  );
}

export default Separator;
