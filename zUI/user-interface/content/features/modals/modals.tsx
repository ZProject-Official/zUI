import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { getAnimation } from "./animations";
import fetchNui from "../../hooks/fetchNui";
import useNuiEvent from "../../hooks/useNuiEvent";

import extractFontName from "../../utils/functions/extractFontName";
import extractFontWeight from "../../utils/functions/extractFontWeight";

import "./modal.css";

import { inputProps, ModalThemeProps } from "./props";

import defaultTheme from "./defaultTheme.json";

function Modal() {
  const [visible, setVisible] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [styles, setStyles] = useState<string>("");
  const [inputs, setInputs] = useState<inputProps[]>([]);
  const [inputValues, setInputValues] = useState<Record<string, any>>({});
  const [theme, setTheme] = useState<ModalThemeProps>(
    defaultTheme as ModalThemeProps
  );
  const [themeIsReceived, setThemeIsReceived] = useState<boolean>(false);

  useEffect(() => {
    if (theme && theme?.fonts) {
      const links = Object.values(theme.fonts)
        .filter((fontUrl) => fontUrl)
        .map((fontUrl) => {
          const link = document.createElement("link");
          link.href = fontUrl;
          link.rel = "stylesheet";
          document.head.appendChild(link);
          return link;
        });
      return () => {
        links.forEach((link) => {
          if (link) document.head.removeChild(link);
        });
      };
    }
  }, [theme?.fonts]);

  useEffect(() => {
    if (!themeIsReceived) {
      fetchNui("zUI-GetModalTheme", {});
    }
  }, [themeIsReceived, visible]);

  // Nui Events
  useNuiEvent<ModalThemeProps>("zUI-SetModalTheme", (data) => {
    setTheme(data);
    if (data !== null || data !== undefined) {
      setThemeIsReceived(true);
    }
  });

  useNuiEvent("zUI-ShowModal", (data: any) => {
    setVisible(true);
    setTitle(data.title);
    setInputs(data.inputs);
    setStyles(data.styles);
    setInputValues(
      data.inputs.reduce((acc: Record<string, any>, input: inputProps) => {
        acc[input.name] = input.defaultValue || "";
        return acc;
      }, {})
    );
  });

  const handleInputChange = (name: string, value: any) => {
    setInputValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchNui("zUI-ModalResult", { inputsValue: inputValues });
    setVisible(false);
  };

  const handleCancel = () => {
    fetchNui("zUI-ModalCancel", {});
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <div id="zUI-ModalContainer">
          <motion.div
            id="zUI-Modal"
            initial={getAnimation(theme.animations).initialAnim}
            animate={getAnimation(theme.animations).animateAnim}
            exit={getAnimation(theme.animations).exitAnim}
            style={{
              background: theme.backgroundColor || "#121212",
              borderRadius: `${theme.borderRadius || 0.5}em`,
            }}
          >
            {title.length > 0 && (
              <h2
                id="zUI-ModalTitle"
                style={{
                  fontSize: "150%",
                  fontFamily: `${extractFontName(
                    theme?.fonts?.title
                  )}, sans-serif`,
                  fontWeight: extractFontWeight(theme?.fonts?.title),
                }}
              >
                {title}
              </h2>
            )}
            {inputs && inputs.length > 0 && (
              <form id="zUI-ModalForm" onSubmit={handleSubmit}>
                {inputs.map((input) => {
                  switch (input.type) {
                    case "text":
                    case "number":
                    case "date":
                      return (
                        <motion.div className="zUI-Input" key={input.name}>
                          <h1
                            className="zUI-InputTitle"
                            style={{
                              fontFamily: `${extractFontName(
                                theme?.fonts?.names
                              )}, sans-serif`,
                              fontWeight: extractFontWeight(
                                theme?.fonts?.names
                              ),
                            }}
                          >
                            {input.name}
                          </h1>
                          <h1
                            className="zUI-InputDescription"
                            style={{
                              color: "grey",
                              fontFamily: `${extractFontName(
                                theme?.fonts?.descriptions
                              )}, sans-serif`,
                              fontWeight: extractFontWeight(
                                theme?.fonts?.descriptions
                              ),
                            }}
                          >
                            {input.description}
                          </h1>
                          <input
                            className="zUI-InteractiveInput"
                            style={
                              {
                                backgroundColor: theme.inputColor || "#222222",
                                color: theme.inputTextColor || "white",
                                fontFamily: `${extractFontName(
                                  theme?.fonts?.inputsContent
                                )}, sans-serif`,
                                fontWeight: extractFontWeight(
                                  theme?.fonts?.inputsContent
                                ),
                              } as React.CSSProperties
                            }
                            type={input.type}
                            value={inputValues[input.name] || ""}
                            required={input.isRequired}
                            minLength={input.minLength}
                            maxLength={input.maxLength}
                            onChange={(e) =>
                              handleInputChange(input.name, e.target.value)
                            }
                          />
                        </motion.div>
                      );
                    case "checkbox":
                      return (
                        <motion.div className="zUI-Input" key={input.name}>
                          <label
                            style={{
                              fontFamily: `${extractFontName(
                                theme?.fonts?.names
                              )}, sans-serif`,
                              fontWeight: extractFontWeight(
                                theme?.fonts?.names
                              ),
                            }}
                          >
                            <h1
                              className="zUI-InputDescription"
                              style={{
                                color: "grey",
                                fontFamily: `${extractFontName(
                                  theme?.fonts?.descriptions
                                )}, sans-serif`,
                                fontWeight: extractFontWeight(
                                  theme?.fonts?.descriptions
                                ),
                                marginBottom: "0.5vh",
                              }}
                            >
                              {input.description}
                            </h1>
                            <input
                              type="checkbox"
                              className="zUI-Checkbox"
                              style={{
                                transform: "translateY(25%",
                              }}
                              checked={!!inputValues[input.name]}
                              onChange={(e) =>
                                handleInputChange(input.name, e.target.checked)
                              }
                            />
                            {input.name}
                          </label>
                        </motion.div>
                      );
                    case "colorpicker":
                      return (
                        <motion.div className="zUI-Input" key={input.name}>
                          <h1
                            className="zUI-InputTitle"
                            style={{
                              fontFamily: `${extractFontName(
                                theme?.fonts?.names
                              )}, sans-serif`,
                              fontWeight: extractFontWeight(
                                theme?.fonts?.names
                              ),
                            }}
                          >
                            {input.name}
                          </h1>
                          <h1
                            className="zUI-InputDescription"
                            style={{
                              color: "grey",
                              fontFamily: `${extractFontName(
                                theme?.fonts?.descriptions
                              )}, sans-serif`,
                              fontWeight: extractFontWeight(
                                theme?.fonts?.descriptions
                              ),
                            }}
                          >
                            {input.description}
                          </h1>
                          <input
                            type="color"
                            value={inputValues[input.name] || "#000000"}
                            onChange={(e) =>
                              handleInputChange(input.name, e.target.value)
                            }
                          />
                        </motion.div>
                      );
                    default:
                      return null;
                  }
                })}
                <div id="zUI-ModalActions">
                  <button
                    className="zUI-ModalButton zUI-ButtonSecondary"
                    type="button"
                    onClick={handleCancel}
                    style={
                      {
                        fontFamily: `${extractFontName(
                          theme?.fonts?.inputsContent
                        )}, sans-serif`,
                        fontWeight: extractFontWeight(
                          theme?.fonts?.inputsContent
                        ),
                        "--modalColor": theme.color || "#faad2c",
                      } as React.CSSProperties
                    }
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="zUI-ModalButton zUI-ButtonPrimary"
                    style={
                      {
                        fontFamily: `${extractFontName(
                          theme?.fonts?.inputsContent
                        )}, sans-serif`,
                        fontWeight: extractFontWeight(
                          theme?.fonts?.inputsContent
                        ),
                        "--modalColor": theme.color || "#faad2c",
                      } as React.CSSProperties
                    }
                  >
                    Submit
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default Modal;
