import React from "react";
import ReactDOM from "react-dom/client";

import background from "./assets/images/background.png";

import Menu from "./components/menu";
import KeyboardInput from "./components/keyboardInput/keyboardInput";
import AlertInput from "./components/alertInput/alertInput";

// StyleSheets
import "./reset.css";
import "./main.css";
import "./components/menu.css";
import "./components/items/items.css";
import "./components/items/line/line.css";
import "./components/items/separator/separator.css";
import "./components/items/list/list.css";
import "./components/items/checkbox/checkbox.css";
import "./components/keyboardInput/keyboardInput.css";
import "./components/alertInput/alertInput.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* <img src={background} id="debug-Background" /> */}
    <Menu />
    <KeyboardInput />
    <AlertInput />
  </React.StrictMode>
);
