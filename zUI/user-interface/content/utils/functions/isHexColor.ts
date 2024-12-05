const isHexColor = (str: string): boolean =>
  /^#[0-9A-Fa-f]{6}$|^#[0-9A-Fa-f]{3}$/.test(str);

export default isHexColor;
