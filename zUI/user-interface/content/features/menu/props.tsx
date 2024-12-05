import React from "react";

export interface ThemeProps {
  position: string;
  displayDescription: boolean;
  displayControlsIndicator: boolean;
  colors: {
    background: string;
    description: string;
    controlsIndicator: string;
    item: string;
  };
  animations: {
    entry: string;
    exit: string;
    onScroll: boolean;
  };
  fonts: {
    title: string;
    subtitle: string;
    description: string;
    counter: string;
    itemTitle: string;
    itemRightLabel: string;
    info: string;
    infoPanelTitle: string;
  };
  banner: string;
  cornersRadius: number;
  perspective: boolean;
  padding: boolean;
  items: {
    maxItems: number;
    hoverColor: string;
    hoverStyle: "complete" | "rod" | "neon";
    lineIsRounded: boolean;
  };
}

export interface MenuProps {
  isVisible: boolean;
  theme: ThemeProps;
  banner: string;
  title: string;
  subtitle: string;
  description: string;
  items: [];
}

export interface ResetProps {
  lastMenu: string;
  newMenu: string;
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
  index: number;
  step: number;
  setDescription: (value: string) => void;
}

export interface ButtonProps {
  title: string;
  styles: {
    IsDisabled?: boolean;
    RightLabel?: string;
    RightBadge?: string;
    LeftBadge?: string;
    Color?: string;
  };
  actionId: string;
  isSelected: boolean;
  hoverType: "complete" | "rod" | "neon";
  hoverColor: string;
  paddingIsActive: boolean;
  rightLabelFont: string;
  titleFont: string;
  hoverEvent?: boolean;
  description: string;
  setDescription: (value: string) => void;
}

export interface InteractionProps {
  type: string;
}

export interface LineProps {
  defaultColor: string;
  rounded: boolean;
  colors?: string[];
  paddingIsActive: boolean;
}

export interface SeparatorProps {
  title: string;
  position: string;
  titleFont: string;
  paddingIsActive: boolean;
}

export interface LinkButtonProps {
  title: string;
  actionId: string;
  styles: {
    LeftBadge?: string;
    IsDisabled?: boolean;
    Color?: string;
  };
  isSelected: boolean;
  hoverType: "complete" | "rod" | "neon";
  hoverColor: string;
  paddingIsActive: boolean;
  titleFont: string;
  link: string;
  description: string;
  setDescription: (value: string) => void;
}

export interface CheckboxProps {
  title: string;
  styles: {
    LeftBadge?: string;
    IsDisabled?: boolean;
    Color?: string;
  };
  state: boolean;
  isSelected: boolean;
  hoverType: "complete" | "rod" | "neon";
  hoverColor: string;
  paddingIsActive: boolean;
  titleFont: string;
  actionId: string;
  description: string;
  setDescription: (value: string) => void;
}

export interface ListProps {
  title: string;
  styles: {
    LeftBadge?: string;
    IsDisabled?: boolean;
    Color?: string;
  };
  items: string[];
  actionId: string;
  isSelected: boolean;
  hoverType: "complete" | "rod" | "neon";
  hoverColor: string;
  paddingIsActive: boolean;
  titleFont: string;
  rightLabelFont: string;
  index: number;
}

export interface SliderProps {
  title: string;
  styles: {
    IsDisabled?: boolean;
    Color?: string;
    ShowPercentage?: boolean;
  };
  actionId: string;
  isSelected: boolean;
  hoverType: "complete" | "rod" | "neon";
  hoverColor: string;
  percentage: number;
  step: number;
  paddingIsActive: boolean;
  titleFont: string;
  rightLabelFont: string;
}

export interface AnimationsProps {
  entry: string;
  exit: string;
}

export interface InfoPanelProps {
  title: string;
  infos: string[][];
  banner: string;
}
