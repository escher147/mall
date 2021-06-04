import { requestGdata } from './request'

export function getCategory() {
    return requestGdata({
        url: '/category'
    })
}

export function getSubCategory(maitKey) {
    return requestGdata({
        url: '/subcategory',
        params: {
            maitKey
        }
    })
}

export function getCategoryDetail(miniWallkey, type) {
    return requestGdata({
        url: '/subcategory/detail',
        params: {
            miniWallkey,
            type
        }
    })
}