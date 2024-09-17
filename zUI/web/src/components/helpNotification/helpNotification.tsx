import { useState, useEffect, useRef } from "react";
import { useNuiEvent } from "../../Hooks/useNuiEvent";
import { AnimatePresence, motion } from "framer-motion";

interface CoordsProps {
  x: number;
  y: number;
}

interface HelpNotificationData {
  key: string;
  description: string;
  onScreen: boolean;
  coords: CoordsProps;
}

function HelpNotification() {
  const [visible, setVisible] = useState<boolean>(false);
  const [key, setKey] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [x, setXCoords] = useState<number>(0);
  const [y, setYCoords] = useState<number>(0);
  const [onScreen, setOnScreen] = useState<boolean>(false);

  const timeoutRef = useRef<number | null>(null);

  useNuiEvent<HelpNotificationData>("zUI-ShowHelpNotification", (data) => {
    setVisible(onScreen);
    setKey(data.key);
    setOnScreen(data.onScreen);
    setDescription(data.description);
    setXCoords(data.coords.x);
    setYCoords(data.coords.y);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setVisible(false);
    }, 10);
  });

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <>
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ scale: 0, translateX: "-50%", translateY: "-50%" }}
            animate={{ scale: 1, translateX: "-50%", translateY: "-50%" }}
            exit={
              onScreen
                ? { scale: 0, translateX: "-50%", translateY: "-50%" }
                : {}
            }
            transition={{ duration: 0.5 }}
            id="help-container"
            style={{
              position: "absolute",
              left: `${x}%`,
              top: `${y}%`,
              transform: "translate(-50%, -50%)",
            }}
          >
            <div id="help-key">{key}</div>
            <div id="help-description">{description}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default HelpNotification;
