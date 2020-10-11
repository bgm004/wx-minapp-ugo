// pages/cart/index.js
import {requestPayment, showToast} from '../../utils/asyncWx'
import regeneratorRuntime from '../../lib/runtime/runtime'
import { request } from '../../request/index.js'

Page({
  data: {
    address: {},
    cart: [],
    totalPrice: 0,
    totalNum: 0
  },
  onLoad: function (options) {
    
  },
  onShow () {
    //获取缓存中的购物车数据
    // 如果是直接点击购买,则获取缓存中的goShop数据渲染
    let pages = getCurrentPages()
    let currentPage = pages[pages.length-1]
    const {type} = currentPage.options
   
    if (type === '1') {
      let cart = wx.getStorageSync('goShop') || []
      this.getPrice(cart)
      return
    }
    let cart = wx.getStorageSync('cart') || []
    cart = cart.filter(v=>v.checked)
    this.getPrice(cart)
  },
  // 计算总价和数量
  getPrice (cart) {
    //实时更新data中的收货地址
    const address = wx.getStorageSync("address")
    // 重新计算总价和数量
    let totalPrice = 0
    let totalNum = 0
    cart.forEach(v => {
        totalPrice += v.num * v.goods_price
        totalNum += v.num
    })
    this.setData({
      cart,
      totalNum,
      totalPrice,
      address
    })
  },
  // 点击支付
  async handleOrderPay () {
    try {
      //判断缓存中有没有token
      const token = wx.getStorageSync('token')

      if (!token) {
        wx.navigateTo({
          url: '/pages/auth/index'
        })
        return
      }
      // 创建订单
      // 准备请求参数
      const order_price = this.data.totalPrice
      const consignee_addr = this.data.address.all
      let goods = []
      const cart = this.data.cart
      cart.forEach(v=>goods.push({
        goods_id: v.goods_id,
        goods_number: v.num,
        goods_price: v.goods_price
      }))
      // 创建订单
      const data = {order_price, consignee_addr, goods}
      //获取订单编号
      const { order_number } = await request({url: '/my/orders/create', method: 'post', data})
      // 发起预支付接口
      const {pay} = await request({url: '/my/orders/req_unifiedorder', method: 'post', data: {order_number}})
      // 支付
      await requestPayment(pay)
      // 查询后台,支付是否成功
      const res = await request({url: '/my/orders/chkOrder', method: 'post', data: {order_number}})
      await showToast('支付成功')
      let newCart = wx.getStorageSync('cart')
      newCart = newCart.filter(v => !v.checked)
      wx.setStorageSync(cart, newCart)
      // 跳转到订单页面
      wx.navigateTo({
        url: '/pages/order/index'
      })
    } catch (err) {
      await showToast('支付失败')
      console.log(err)
    }
  }
})
