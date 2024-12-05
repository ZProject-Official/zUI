export interface PulsingNotificationTheme {
  defaultColor: string;
  animations: {
    entry: string;
    exit: string;
  };
}

export interface HelpNotificationTheme {
  defaultColor: string;
  animations: {
    entry: string;
    exit: string;
  };
}

export interface NotificationsTheme {
  pulsingNotifications: PulsingNotificationTheme;
  notifications: NotificationTheme;
  helpNotifications: HelpNotificationTheme;
  fonts: {
    key: string;
    pulsingDescription: string;
    notificationTitle: string;
    notificationDescription: string;
    notificationType: string;
    helpNotification: string;
  };
}

export interface NotificationTheme {
  colors: {
    background: string;
    timer: string;
  };
  animations: AnimationsProps;
}

export interface PulsingNotificationEvent {
  key: string;
  description: string;
  coords: { x: number; y: number };
  isVisibleOnScreen: boolean;
  styles: {
    Color: string;
    IsDisabled: boolean;
    Scale: number;
  };
}

export interface HelpNotificationEvent {
  content: string;
  styles: {
    Color: string;
  };
}

export interface PulsingNotificationStyle {
  Color: string;
  IsDisabled: boolean;
  Scale: number;
}

export interface HelpNotificationStyle {
  Color: string;
}

export interface PulsingAnimationsProps {
  entry: string;
  exit: string;
}

export interface NotificationProps {
  id: number;
  title: string;
  description: string;
  type: { color: string; content: string };
  icon: string | null;
  banner: string | null;
  time: number | null;
  theme: NotificationTheme;
  titleFont: string;
  descriptionFont: string;
  typeFont: string;
  onDelete: () => void;
}

export interface AnimationsProps {
  entry: string;
  exit: string;
}

export interface NotificationEventProps {
  title: string;
  message: string;
  type: { content: string | undefined; color: string | undefined };
  icon: string | undefined;
  banner: string | undefined;
  time: number | undefined;
}
