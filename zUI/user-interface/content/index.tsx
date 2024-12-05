import React from "react";
import ReactDOM from "react-dom/client";

// StyleSheets
import "./reset.css";
import "./index.css";
import "./fonts.css";

// Components
import Features from "./features/features";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <div id="container">
      <Features />
    </div>
  </React.StrictMode>
);
