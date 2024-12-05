import { AnimationsProps } from "../props";

export function getAnimation({ entry, exit }: AnimationsProps) {
  let initialAnim: any = {};
  let animateAnim: any = {};
  let exitAnim: any = {};

  switch (entry) {
    case "fadeIn":
      initialAnim = { opacity: 0 };
      animateAnim = { opacity: 1 };
      break;
    case "slideInHorizontal":
      initialAnim = { x: "-150%" };
      animateAnim = { x: "0%" };
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
      exitAnim = { x: "-125%" };
      break;
    default:
      exitAnim = { opacity: 0 };
      break;
  }

  return { initialAnim, animateAnim, exitAnim };
}
