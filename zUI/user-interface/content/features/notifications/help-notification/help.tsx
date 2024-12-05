import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Functions
import useNuiEvent from "../../../hooks/useNuiEvent";
import formatString from "../../../utils/functions/formatString";
import { getAnimation } from "./animations";

// Props
import {
  HelpNotificationTheme,
  HelpNotificationEvent,
  HelpNotificationStyle,
} from "../props";

// StyleSheets
import "./help.css";

function HelpNotification({
  theme,
  contentFont,
}: {
  theme: HelpNotificationTheme;
  contentFont: { name: string | undefined; weight: number | undefined };
}) {
  const [visible, setVisible] = useState<boolean>(false);
  const [description, setDescription] = useState<string>("");
  const [style, setStyle] = useState<HelpNotificationStyle>();

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useNuiEvent<HelpNotificationEvent>("zUI-DisplayHelpNotification", (data) => {
    setDescription(data.content);
    setStyle(data.styles);
    setVisible(true);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setVisible(false);
    }, 100);
  });

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
          style={{
            maxWidth: "12.5vw",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            left: "1%",
            top: "1.5%",
            gap: "0.5vh",
          }}
          initial={getAnimation(theme.animations).initialAnim}
          animate={getAnimation(theme.animations).animateAnim}
          exit={getAnimation(theme.animations).exitAnim}
          transition={{ duration: 0.5 }}
        >
          <div
            id="zUI-HelpNotification"
            style={{
              fontFamily: `${contentFont.name}, sans-serif`,
              fontWeight: contentFont.weight,
            }}
            color="white"
          >
            {formatString(description)}
          </div>
          <AnimatePresence>
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: "80%" }}
              exit={{ width: "0%" }}
              transition={{ duration: 1.5 }}
              style={{
                height: "0.25vh",
                borderRadius: "100em",
                background: `${style?.Color || theme.defaultColor}`,
                boxShadow: `0 0 10px ${style?.Color || theme.defaultColor}`,
              }}
            ></motion.div>
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default HelpNotification;
