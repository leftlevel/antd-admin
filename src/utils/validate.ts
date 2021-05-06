/**
 * @description: 判断是否是外链
 * @param {string} path
 * @return {*}
 */
export function isExternal(path: string): boolean {
  return /^(https?:|mailto:|tel:)/.test(path)
}

