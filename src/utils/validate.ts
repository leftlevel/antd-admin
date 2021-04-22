/**
 * @author chuzhixin 1204505056@qq.com
 * @description 判读是否为外链
 * @param path
 * @returns {boolean}
 */
export function isExternal(path: string): boolean {
  return /^(https?:|mailto:|tel:)/.test(path)
}

