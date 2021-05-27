import { requestGdata } from './request'

export function getDetail(iid) {
    return requestGdata({
        url: '/detail',
        params: {
            iid
        }
    })
}

export function getRecommend() {
    return requestGdata({
        url: '/recommend'
    })
}

// 商品基本信息类
export class GoodsInfo {
    constructor(itemInfo, columns, services) {
        this.title = itemInfo.title;
        this.desc = itemInfo.desc;
        this.newPrice = itemInfo.price;
        this.oldPrice = itemInfo.oldPrice;
        this.discount = itemInfo.discountDesc;
        this.columns = columns;
        this.services = services;
        this.realPrice = itemInfo.lowNowPrice
    }
}

// 店铺信息
export class Shop {
    constructor(shopInfo) {
        this.logo = shopInfo.shopLogo;
        this.name = shopInfo.name;
        this.fans = shopInfo.cFans;
        this.sells = shopInfo.cSells;
        this.score = shopInfo.score;
        this.goodsCount = shopInfo.cGoods
    }
}

export class GoodsParam {
    constructor(info, rule) {
        // images可能有值也可能没值
        this.image = info.images ? info.images[0] : '';
        this.infos = info.set;
        this.sizes = rule.tables;
    }
}