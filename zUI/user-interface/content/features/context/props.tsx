export interface ContextProps {
  Visible: boolean;
  Position: { x: number; y: number };
  Items: Array<any>;
}

export interface ItemProps {
  type: string;
  title: string;
  description: string;
  styles: {
    IsDisabled?: boolean;
    RightLabel?: string;
    RightBadge?: string;
    LeftBadge?: string;
    Color?: string;
  };
  state: boolean;
  items: string[];
  link: string;
  actionId: string;
  isSelected: boolean;
  hoverType: "complete" | "rod" | "neon";
  colors?: string[];
  rounded: boolean;
  hoverColor: string;
  position: string;
  paddingIsActive: boolean;
  defaultColor: string;
  percentage: number;
  step: number;
  setDescription: (value: string) => void;
}

export interface ThemeProps {
  colors: {
    background: string;
    item: string;
  };
  animations: {
    entry: string;
    exit: string;
  };
  fonts: {
    title: string;
    subtitle: string;
    description: string;
    counter: string;
    itemTitle: string;
    itemRightLabel: string;
  };
  cornersRadius: number;
  padding: boolean;
  items: {
    maxItems: number;
    hoverColor: string;
    hoverStyle: "complete" | "rod" | "neon";
    lineIsRounded: boolean;
  };
}

export interface AnimationsProps {
  entry: string;
  exit: string;
}
