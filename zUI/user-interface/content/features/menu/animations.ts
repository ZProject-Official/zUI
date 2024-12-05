import { AnimationsProps } from "./props";

export function getAnimation(
  { entry, exit }: AnimationsProps,
  position: string
) {
  let initialAnim: any = {};
  let animateAnim: any = {};
  let exitAnim: any = {};

  switch (entry) {
    case "fadeIn":
      initialAnim = { opacity: 0 };
      animateAnim = { opacity: 1 };
      break;
    case "slideInHorizontal":
      initialAnim = { x: position == "left" ? "-150%" : "150%" };
      animateAnim = { x: "0%" };
      break;
    case "slideInVertical":
      initialAnim = { y: "-150%" };
      animateAnim = { y: "0%" };
      break;
    default:
      initialAnim = { opacity: 0 };
      animateAnim = { opacity: 1 };
      break;
  }

  switch (exit) {
    case "fadeOut":
      exitAnim = { opacity: 0 };
      break;
    case "slideOutHorizontal":
      exitAnim = { x: position == "left" ? "-150%" : "150%" };
      break;
    case "slideOutVertical":
      exitAnim = { y: "-150%" };
      break;
    default:
      exitAnim = { opacity: 0 };
      break;
  }

  return { initialAnim, animateAnim, exitAnim };
}
