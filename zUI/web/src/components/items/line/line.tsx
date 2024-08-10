interface LineInterface {
  Colors?: string[];
}

function Line({ Colors = [] }: LineInterface) {
  return (
    <div className="line-container">
      <div
        className="line"
        style={{
          width: "90%",
          minHeight: "0.5vh",
          maxHeight: "0.5vh",
          borderRadius: "100em",
          background:
            Colors.length > 1
              ? `linear-gradient(to right, ${Colors.join(", ")})`
              : Colors[0] || "#FAAD2C", // Utilisation de la première couleur ou couleur par défaut
        }}
      ></div>
    </div>
  );
}

export default Line;
