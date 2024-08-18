export const isEnvBrowser = (): boolean => !(window as any).invokeNative;

export const noop = () => {};

