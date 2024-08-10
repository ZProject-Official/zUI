import React from "react";
import ReactDOM from "react-dom/client";

import "./reset.css";
// Menu
import Menu from "./components/menu";
// Stylesheets
import "./components/menu.css";
import "./components/items/button/button.css";
import "./components/items/line/line.css";
import "./components/items/separator/separator.css";
import "./components/items/checkbox/checkbox.css";
import "./components/items/list/list.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Menu />
  </React.StrictMode>
);
