// Will return whether the current environment is in a regular browser
// and not CEF
export const isEnvBrowser = (): boolean => !(window as any).invokeNative;

// Basic no operation function
export const noop = () => {};

export const formatMoney = (amount: number): string => {
  let strNum: string = amount.toString();
  var pattern = /(-?\d+)(\d{3})/;
  while (pattern.test(strNum)) strNum = strNum.replace(pattern, "$1.$2");
  return "$" + strNum;
};