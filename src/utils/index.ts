/**
 * 截取字符串，超出部分用...表示
 * @param str
 * @param maxLength
 * @returns
 */
export const truncateString = (str: string, maxLength: number = 10): string => {
  return str.length > maxLength ? `${str.slice(0, maxLength)}...` : str;
};
