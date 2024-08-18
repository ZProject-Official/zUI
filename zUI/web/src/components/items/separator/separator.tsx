// Utils
import formatString from "../../../utils/formatString";

// Interfaces
interface SeparatorInterface {
  Title: string;
}

function Separator({ Title }: SeparatorInterface) {
  return (
    <div className="zUI-Item">
      <div className="zUI-SeparatorContainer">
        <h1 className="zUI-SeparatorTitle">{formatString(Title)}</h1>
      </div>
    </div>
  );
}

export default Separator;
