import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

// Functions
import extractFontName from "../../utils/functions/extractFontName";
import extractFontWeight from "../../utils/functions/extractFontWeight";
import fetchNui from "../../hooks/fetchNui";
import useNuiEvent from "../../hooks/useNuiEvent";

// Props
import {
  NotificationsTheme,
  NotificationTheme,
  PulsingNotificationTheme,
  HelpNotificationTheme,
  NotificationProps,
} from "./props";

// StyleSheets
import "./notifications.css";
import "./pulsingNotification/pulsingNotification.css";

// Notifications
import PulsingNotification from "./pulsingNotification/pulsingNotification";
import Notification from "./notification/notification";

// Theme
import defaultTheme from "./defaultTheme.json";
import HelpNotification from "./help-notification/help";
import { textColor } from "../../utils/data/fontsModifiers";

function Notifications() {
  const [themeIsReceived, setThemeIsReceived] = useState<boolean>(false);
  const [theme, setTheme] = useState<NotificationsTheme>(defaultTheme);
  const [notifications, setNotifications] = useState<Array<any>>([]);

  const addNotification = (data: NotificationProps) => {
    const newNotification = { ...data, Id: uuidv4() };
    setNotifications((prev) => [...prev, newNotification]);
  };

  const deleteNotification = (index: number) => {
    setNotifications((prev) => prev.filter((_, i) => i !== index));
  };

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
      fetchNui("zUI-GetNotifsTheme", {});
    }
  }, [themeIsReceived]);

  // Nui Events
  useNuiEvent<NotificationsTheme>("zUI-SetNotifsTheme", (data) => {
    setTheme(data);
    if (data !== null || data !== undefined) {
      setThemeIsReceived(true);
    }
  });

  useNuiEvent<NotificationProps>("zUI-SendNotification", (data) => {
    addNotification(data);
  });

  return (
    <div id="zUI-NotificationsContainer">
      <PulsingNotification
        theme={theme.pulsingNotifications}
        keyFont={{
          name: extractFontName(theme.fonts.key),
          weight: extractFontWeight(theme.fonts.key),
        }}
        descriptionFont={{
          name: extractFontName(theme.fonts.pulsingDescription),
          weight: extractFontWeight(theme.fonts.pulsingDescription),
        }}
      />
      <HelpNotification
        theme={theme.helpNotifications}
        contentFont={{
          name: extractFontName(theme.fonts.helpNotification),
          weight: extractFontWeight(theme.fonts.helpNotification),
        }}
      />
      <div id="zUI-Notifications">
        <div id="zUI-NotificationWrapper">
          {notifications &&
            notifications.length > 0 &&
            notifications.map((notification, id) => {
              return (
                <Notification
                  {...notification}
                  titleFont={theme.fonts.notificationTitle}
                  descriptionFont={theme.fonts.notificationDescription}
                  typeFont={theme.fonts.notificationType}
                  theme={theme.notifications}
                  key={notification.Id}
                  onDelete={() => {
                    deleteNotification(id);
                    console.log("delete");
                  }}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default Notifications;
