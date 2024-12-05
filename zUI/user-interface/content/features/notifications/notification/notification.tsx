import React, { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";

// Functions
import extractFontName from "../../../utils/functions/extractFontName";
import extractFontWeight from "../../../utils/functions/extractFontWeight";
import { getAnimation } from "./animations";
import sleep from "../../../utils/functions/sleep";

// Props
import { NotificationProps } from "../props";

// StyleSheets
import "./notification.css";
import formatString from "../../../utils/functions/formatString";

function Notification({
  id,
  title,
  description,
  type,
  icon,
  banner,
  time,
  theme,
  titleFont,
  descriptionFont,
  typeFont,
  onDelete,
}: NotificationProps) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);
  const onDeleteRef = useRef(onDelete);

  useEffect(() => {
    onDeleteRef.current = onDelete;
  }, [onDelete]);

  async function handleDelete(onDeleteRef: any) {
    setVisible(false);
    await sleep(100);
    onDeleteRef.current();
  }

  useEffect(() => {
    const intervalDuration = 10;
    time = time || 5000;
    const step = (100 / time) * intervalDuration;

    const intervalId = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(intervalId);
          handleDelete(onDeleteRef);
          return 100;
        }
        return prevProgress + step;
      });
    }, intervalDuration);

    return () => clearInterval(intervalId);
  }, [time]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          layout
          initial={getAnimation(theme.animations).initialAnim}
          animate={getAnimation(theme.animations).animateAnim}
          exit={getAnimation(theme.animations).exitAnim}
          transition={{ type: "spring" }}
          className="zUI-Notification"
          style={{
            background: theme.colors.background,
            borderRadius: banner ? "0.75em" : "0.25em 0.25em 0.75em 0.75em",
          }}
        >
          {banner && <img className="zUI-NotificationBanner" src={banner} />}
          <div className="zUI-NotificationTimer">
            <div
              style={{
                width: `${progress}%`,
                height: "100%",
                borderRadius: progress < 98 ? "0 0.5em 0.5em 0" : "0",
                background: theme.colors.timer || "white",
                transition: "width 0.1s",
              }}
            ></div>
          </div>
          <div className="zUI-NotificationContentWrapper">
            {icon && <img className="zUI-NotificationIcon" src={icon} />}
            <div className="zUI-NotificationInfos">
              <div className="zUI-NotificationTopInfo">
                <h1
                  className="zUI-NotificationTitle"
                  style={{
                    fontFamily: `${extractFontName(titleFont)}, sans-serif`,
                    fontWeight: extractFontWeight(titleFont),
                  }}
                >
                  {formatString(
                    title.slice(0, 15) + (title.length > 15 ? "..." : "")
                  )}
                </h1>
                {type && type.color && type.content && (
                  <h1
                    className="zUI-NotificationType"
                    style={{
                      background: type.color || "#faad2c",
                      color: "white",
                      fontFamily: `${extractFontName(typeFont)}, sans-serif`,
                      fontWeight: extractFontWeight(typeFont),
                    }}
                  >
                    {type.content.toUpperCase()}
                  </h1>
                )}
              </div>
              <h1
                className="zUI-NotificationDescription"
                style={{
                  fontFamily: `${extractFontName(descriptionFont)}, sans-serif`,
                  fontWeight: extractFontWeight(descriptionFont),
                }}
              >
                {formatString(
                  description.slice(0, 97) +
                    (description.length > 97 ? "..." : "")
                )}
              </h1>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Notification;
