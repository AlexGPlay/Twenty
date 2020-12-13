import { useMediaQuery } from "react-responsive";

const getMinWidth = (width: number) => useMediaQuery({ query: `(min-width: ${width}px)` });
const getMaxWidth = (width: number) => useMediaQuery({ query: `(max-width: ${width}px)` });

export const onMinWidth = (width: number, callback: () => void) => getMinWidth(width) && callback();
export const onMaxWidth = (width: number, callback: () => void) => getMaxWidth(width) && callback();
export const isScreenSmallerThan = (width: number) => getMaxWidth(width);