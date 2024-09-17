import React from "react";
import ReactDOM from "react-dom/client";

// Components
import AlertInput from "./components/alertInput/alertInput";
import KeyboardInput from "./components/keyboardInput/keyboardInput";
import Menu from "./components/menu/menu";
import HelpNotification from "./components/helpNotification/helpNotification";

// StyleSheets
import "./reset.css";
import "./fonts.css";
import "./main.css";
import "./components/menu/menu.css";
import "./components/items/items.css";
import "./components/helpNotification/helpNotification.css";
import "./components/keyboardInput/keyboardInput.css";
import "./components/alertInput/alertInput.css";

// Items
import "./components/items/line/line.css";
import "./components/items/separator/separator.css";
import "./components/items/checkbox/checkbox.css";
import "./components/items/list/list.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HelpNotification />
    <Menu />
    <KeyboardInput />
    <AlertInput  />
  </React.StrictMode>
);
