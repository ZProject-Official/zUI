import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Functions
import useNuiEvent from "../../../hooks/useNuiEvent";
import formatString from "../../../utils/functions/formatString";
import darkenColor from "../../../utils/functions/darkenColor";
import { getAnimation } from "./animations";

// Props
import {
  PulsingNotificationTheme,
  PulsingNotificationEvent,
  PulsingNotificationStyle,
} from "../props";

function PulsingNotification({
  theme,
  keyFont,
  descriptionFont,
}: {
  theme: PulsingNotificationTheme;
  keyFont: { name: string | undefined; weight: number | undefined };
  descriptionFont: { name: string | undefined; weight: number | undefined };
}) {
  const [visible, setVisible] = useState<boolean>(false);
  const [key, setKey] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [style, setStyle] = useState<PulsingNotificationStyle>();
  const [x, setX] = useState<number>(0);
  const [y, setY] = useState<number>(0);
  const [onScreen, setOnScreen] = useState<boolean>(false);

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useNuiEvent<PulsingNotificationEvent>(
    "zUI-DisplayPulsingNotification",
    (data) => {
      setKey(data.key);
      setDescription(data.description);
      setX(data.coords.x);
      setY(data.coords.y);
      setOnScreen(data.isVisibleOnScreen);
      setStyle(data.styles);
      setVisible(onScreen);

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        setVisible(false);
      }, 100);
    }
  );

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          id="zUI-PulsingNotification"
          initial={getAnimation(theme.animations).initialAnim}
          animate={getAnimation(theme.animations).animateAnim}
          exit={onScreen ? getAnimation(theme.animations).exitAnim : undefined}
          style={{
            scale: `${style?.Scale || 1}`,
            left: `${x}%`,
            top: `${y}%`,
            transform: "translate(-50%, -50%)",
          }}
        >
          {style?.IsDisabled ? (
            <div
              id="zUI-PulsingDisabled"
              style={{
                border: `1px solid ${style?.Color || theme.defaultColor}`,
              }}
            >
              <div
                style={{
                  width: "30%",
                  height: "30%",
                  backgroundColor: style.Color || theme.defaultColor,
                  borderRadius: "100em",
                  transition: "0.25",
                  boxShadow: `0px 0px 5px 2px ${
                    style.Color || theme.defaultColor
                  }`,
                }}
              ></div>
            </div>
          ) : (
            <>
              <div id="gradient-wrapper">
                <div
                  id="zUI-PulsingKey"
                  style={{
                    background: `radial-gradient(${darkenColor(
                      style?.Color || theme.defaultColor,
                      25
                    )}, ${style?.Color || theme.defaultColor})`,
                    fontFamily: keyFont.name,
                    fontWeight: keyFont.weight,
                  }}
                >
                  {formatString(key)}
                </div>
              </div>
              <div
                id="zUI-PulsingDescription"
                style={{
                  whiteSpace: "nowrap",
                  transition: "0.1s",
                  fontFamily: descriptionFont.name,
                  fontWeight: descriptionFont.weight,
                }}
              >
                {formatString(description)}
              </div>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default PulsingNotification;
