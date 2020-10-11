// pages/goods_detail/index.js
import {request} from '../../request/index.js'
import regeneratorRuntime from '../../lib/runtime/runtime'

Page({
  data: {
    goodsObj: {},
    isCollect: false
  },
  goodsInfo: {},
  onLoad: function (options) {
    const {goods_id} = options
    this.getGoodsDetail(goods_id)
  },
  onShow () {
    let pages = getCurrentPages()
    let currentPage = pages[pages.length-1]
    let options = currentPage.options
    const {goods_id} = options
    this.getGoodsDetail(goods_id)
    
  },
  //获取商品详情数据
  async getGoodsDetail (goods_id) {
    const res = await request({url: '/goods/detail',data:{goods_id}})
    this.goodsInfo = res
    // 获取缓存中的商品收藏数组
    let collect = wx.getStorageSync('collect') || []
    // 判断当前商品是否被收藏
    let isCollect = collect.some(v=>v.goods_id === this.goodsInfo.goods_id)
    this.setData({
      goodsObj:{
        goods_name: res.goods_name,
        goods_price: res.goods_price,
        goods_introduce: res.goods_introduce.replace(/\.webp/g,'.jpg'),
        pics: res.pics
      },
      isCollect
    })
  },
  handlePrevewImage (e) {
    const urls = this.goodsInfo.pics.map(v=>v.pics_mid)
    const current = e.currentTarget.dataset.url
    wx.previewImage({
      current,
      urls
    })
  },
  handlecartAdd () {
    let cart = wx.getStorageSync('cart') || []
    //判断当前商品是否存在购物车中
    let index = cart.findIndex(v=>v.goods_id ===this.goodsInfo.goods_id)
    if(index) {
      // 第一次王购物车中添加
      this.goodsInfo.num = 1
      this.goodsInfo.checked = true
      cart.push(this.goodsInfo)
    }else{
      // 购物车中已存在
      cart[index].num++
    }
    // 把购物车数组重新添加会缓存中
    wx.setStorageSync('cart', cart)
    wx.showToast({
      title: '已加入购物车',
      icon: 'success',
      mask: true
    })
  },
  // 点击收藏商品
  handleCollect () {
    let isCollect = false
    // 获取缓存中的商品收藏数组
    let collect = wx.getStorageSync('collect') || []
    // 判断商品是否被收藏过
    let index = collect.findIndex(v=>v.goods_id === this.goodsInfo.goods_id)
    // 当index不等于 -1 的时候说明被收藏过
    if (index !== -1) {
      collect.splice(index,1)
      isCollect = false
      wx.showToast({
        title: '取消成功',
        icon: 'success',
        mask: true
      })
    } else {
      collect.push(this.goodsInfo)
      isCollect = true
      wx.showToast({
        title: '收藏成功',
        icon: 'success',
        mask: true
      })
    }
    // 把数组存入缓存中
    wx.setStorageSync('collect', collect)
    // 修改data当中的 isCollect
    this.setData({isCollect})
  },
  // 点击直接购买当前商品
  goShop () {
    let goodsObj = this.goodsInfo
    goodsObj.num = 1
    wx.setStorageSync('goShop', [goodsObj])
    wx.switchTab({
      url: '/pages/cart/index?type=1'
    })
  }
})