import request from '@/utils/request'

export function getTable() {
  return request({
    url: '/table',
    method: 'get',
  })
}