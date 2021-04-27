import request from '@/utils/request'

export function getVersion() {
  return request ({
    url: '/version',
    method: 'get',
  })
}