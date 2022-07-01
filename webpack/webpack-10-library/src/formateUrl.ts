import { isType } from './isType';
/**
 * @desption 将url参数转换成对象
 * @param params
 * @returns
 */
export const formateUrl = (params: string) => {
  if (isType(params)('String')) {
    if (/^http(s)?/.test(params)) {
      const url = new URL(params);
      // 将参数转换成http://localhost:8080?a=1&b=2   -> {a:1,b:2}
      return Object.fromEntries(url.searchParams.entries());
    }
    // params如果为a=1&b=2,则转换成{a:1,b:2}
    return Object.fromEntries(new URLSearchParams(params).entries());
  }
};
