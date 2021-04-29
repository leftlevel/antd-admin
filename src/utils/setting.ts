// 系统名称
export const title: string = 'antd-admin'
// 系统菜单 logo
export const logo: string = 'vuejs-line'
// 标题分隔符
export const titleSeparator: string = ' - '
// 标题是否反转 如果为 false: "page - title", 如果为 true: "title - page"
export const titleReverse: boolean = false
// token 名称
export const tokenName: string = 'accessToken'
// token 在 localStorage sessionStorage cookie 存储的 key 名称
export const tokenTableName: string = 'accessToken'
// token 本地存储位置 localStorage sessionStorage cookie
export const storage: string = 'localStorage'
// token 失效回退到登录页时是否记录本次的路由
export const recordRoute: boolean = false
//是否开启登录拦截
export const loginInterception: boolean = true
// intelligence（前端导出路由）和all（后端导出路由）两种方式
export const authentication: string = 'intelligence'
// 不经过 token 校验的路由
export const routesWhiteList: string[] = ['/login', '/register', '/callback', '404']