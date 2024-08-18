import React from "react";
import ReactDOM from "react-dom/client";
import Menu from "./components/menu";

// StyleSheets
import "./reset.css";
import "./main.css";
import "./components/menu.css";
import "./components/items/items.css";
import "./components/items/line/line.css";
import "./components/items/separator/separator.css";
import "./components/items/list/list.css";
import "./components/items/checkbox/checkbox.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Menu />
  </React.StrictMode>
);
