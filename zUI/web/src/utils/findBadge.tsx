import { Badges } from "../assets/Badges";

const findBadge = (id: string): string | undefined => {
  if (Badges[id]) {
    const image = new URL(`../assets/badges/${Badges[id]}`, import.meta.url)
      .href;
    return image;
  } else {
    return undefined;
  }
};

export default findBadge;
