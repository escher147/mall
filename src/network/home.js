import { request, requestGdata } from './request'

export function getHomeMultiData() {
    return request({
        url: '/home/multidata'
    })
}

export function getHomeGdata(type, page) {
    return requestGdata({
        url: 'home/data',
        params: {
            type,
            page
        }
    })
}