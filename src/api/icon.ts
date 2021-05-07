import request from '@/utils/request'

export function getIcon(params: Object) {
  return request({
    url: '/icon',
    method: 'get',
    params
  })
}