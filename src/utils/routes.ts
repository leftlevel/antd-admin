import { isExternal } from "./validate"

const path = require('path')

export function filterRoutes(routes: any, baseUrl = '/') {
  return routes.filter((route: any) => {
    return true
  }).map((route: any) => {
    if (route.path !== '*' && !isExternal(route.path)) {
      route.path = path.resolve(baseUrl, route.path)
    }
    route.fullPath = route.path
    if (route.children) {
      route.children = filterRoutes(route.children, route.fullPath)
    }
    return route
  })
}