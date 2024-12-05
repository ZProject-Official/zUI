function extractFontWeight(fontUrl: string | undefined) {
  if (fontUrl) {
    const weightMatch = fontUrl.match(/wght@(\d+)(?:;(\d+))?/);
    if (weightMatch) {
      const minWeight = parseInt(weightMatch[1], 10);
      const maxWeight = weightMatch[2]
        ? parseInt(weightMatch[2], 10)
        : minWeight;
      if (minWeight < maxWeight) {
        return 500;
      }
      return minWeight;
    }
    return 400;
  }
}

export default extractFontWeight;
