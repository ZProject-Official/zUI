function darkenColor(color: string, percentage: number): string {
    const amount = Math.round(2.55 * percentage);
    return color.replace(
      /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i,
      (_, r, g, b) =>
        `#${(parseInt(r, 16) - amount < 0 ? 0 : parseInt(r, 16) - amount)
          .toString(16)
          .padStart(2, "0")}${(parseInt(g, 16) - amount < 0
          ? 0
          : parseInt(g, 16) - amount
        )
          .toString(16)
          .padStart(2, "0")}${(parseInt(b, 16) - amount < 0
          ? 0
          : parseInt(b, 16) - amount
        )
          .toString(16)
          .padStart(2, "0")}`
    );
  }

  export default darkenColor;