import formatString from "../../../utils/formatString";

interface SeparatorInterface {
  Label: string;
}

function Separator({ Label }: SeparatorInterface) {
  return (
    <div className="separator-container">
      <h1 className="separator">{formatString(Label)}</h1>
    </div>
  );
}

export default Separator;
