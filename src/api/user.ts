import request from '@/utils/request'

type Data = {}

export function getVersion() {
  return request({
    url: '/version',
    method: 'get',
  })
}

export function login(data: Data) {
  return request({
    url: '/login',
    method: 'post',
    data,
  })
}

export function logout() {
  return request({
    url: '/logout',
    method: 'post'
  })
}