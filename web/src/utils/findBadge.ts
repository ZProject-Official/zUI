import { Badges } from "../assets/Badges";
import isUrl from "./isUrl";

const findBadge = (id: string): string | undefined => {
  if (Badges[id]) {
    const image = new URL(`../assets/badges/${Badges[id]}`, import.meta.url)
      .href;
    return image;
  } else if (isUrl(id)) {
    return id;
  } else {
    return undefined;
  }
};

export default findBadge;