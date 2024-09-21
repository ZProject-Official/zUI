import React from "react";
import { textColor, fontsModifier } from "../assets/Fonts";
import isDefined from "./isDefined";

import isHexColor from "./isHexColor";

const parseText = (text: string | number): string[] => {
  if (typeof text === "number") {
    text = text.toString();
  }
  return text.split("\n");
};

const formatString = (text: string): JSX.Element[] => {
  const lines = parseText(text);
  return lines.map((line, index) => (
    <React.Fragment key={index}>
      <span dangerouslySetInnerHTML={{ __html: formatMD(line) }} />
      {index < lines.length - 1 && <br />}
    </React.Fragment>
  ));
};

const arrowMappings = (color: string): { [key: string]: string } => ({
  "→": `<svg width="6" height="9" viewBox="0 0 6 9" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1 1L4.5 4.5L1 8" stroke="${color}" stroke-width="2" stroke-linecap="round"/>
</svg>`,
  "↓": `<svg width="10" height="7" viewBox="0 0 10 7" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1.25 1.75L4.75 5.25L8.25 1.75" stroke="${color}" stroke-width="2" stroke-linecap="round"/>
</svg>`,
  "←": `<svg width="7" height="9" viewBox="0 0 7 9" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5.5 1L2 4.5L5.5 8" stroke="${color}" stroke-width="2" stroke-linecap="round"/>
</svg>`,
  "↑": `<svg width="10" height="7" viewBox="0 0 10 7" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1.25 5.25L4.75 1.75L8.25 5.25" stroke="${color}" stroke-width="2" stroke-linecap="round"/>
</svg>`,
});

const formatMD = (text: string): string => {
  let everColoring = false;
  let finalText = "";
  let currentColor = "white";

  if (text) {
    for (let i = 0; i < text.length; i++) {
      if (text[i] === "~") {
        let INFO = "";
        i++;
        while (text[i] !== "~" && i < text.length) {
          INFO += text[i];
          i++;
        }
        if (isDefined(textColor[INFO])) {
          currentColor = textColor[INFO];
          finalText += everColoring
            ? `</span><span style="color: ${currentColor}">`
            : `<span style="color: ${currentColor}">`;
          everColoring = true;
        } else if (isDefined(fontsModifier[INFO])) {
          currentColor = fontsModifier[INFO];
          finalText += everColoring
            ? `</span><span style="${currentColor}">`
            : `<span style="${currentColor}">`;
          everColoring = true;
        } else if (isHexColor(INFO)) {
          currentColor = INFO;
          finalText += everColoring
            ? `</span><span style="color: ${INFO}">`
            : `<span style="color: ${INFO}">`;
          everColoring = true;
        }
      } else if (arrowMappings(currentColor)[text[i]]) {
        finalText += arrowMappings(currentColor)[text[i]];
      } else {
        finalText += text[i];
      }
    }
  }

  if (everColoring) {
    finalText += "</span>";
  }
  return finalText;
};

export default formatString;
