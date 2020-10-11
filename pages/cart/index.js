// pages/cart/index.js
import {getSetting, chooseAddress, openSetting} from '../../utils/asyncWx'
import regeneratorRuntime from '../../lib/runtime/runtime'

Page({
  data: {
    address: {},
    cart: [],
    allChecked: false,
    totalPrice: 0,
    totalNum: 0
  },
  onLoad: function (options) {

  },
  onShow () {
    //实时更新data中的收货地址
    const address = wx.getStorageSync("address")
    this.setData({ address })
    //获取缓存中的购物车数据
    const cart = wx.getStorageSync('cart') || []
    this.setCart(cart)
  },
  //点击获取收获地址
  async handleChooseAddress () {
    try{
      // 获取权限状态
      const res1 = await getSetting()
      const scopeAddress = res1.authSetting['scope.address']
      // 判断是否授权
      if(scopeAddress === false){
        // 让用户手动授权在调用收货地址api
        await openSetting()
      }
      let address = await chooseAddress()
      // 将地址存入缓存
      address.all = address.provinceName+address.cityName+address.countyName+address.detailInfo
      wx.setStorageSync('address', address)
    }catch(err){
      console.log(err)
    }
  },
  //商品复选框变化
  handleItemChange (e) {
    const goods_id = e.currentTarget.dataset.id
    let {cart} = this.data
    let index = cart.findIndex(v=>v.goods_id ===goods_id)
    //对商品的checked 状态取反
    cart[index].checked = !cart[index].checked
    this.setCart(cart)
  },
  //底部工具栏全选
  handleItemAllCheck () {
    let {cart, allChecked} = this.data
    allChecked = !allChecked
    cart.forEach(v=>v.checked = allChecked)
    this.setCart(cart)
  },
  //商品数量修改
  handleItemNumEdit (e) {
    const {id, operation} = e.currentTarget.dataset
    let {cart} = this.data
    // 找到需要修改商品的index
    const index = cart.findIndex(v=>v.goods_id === id)
    if (cart[index].num === 1 && operation === -1) {
      cart.splice(index,1)
      this.setCart(cart)
    } else {
      // 修改商品数量
      cart[index].num += operation
      this.setCart(cart)
    }
  },
  handlePay () {
    const {address, totalNum} = this.data
    // 判断是否选择收货地址
    if(!address.userName) {
      wx.showToast({
        title: '您还没有选择收货地址',
        icon: 'none'
      })
      return
    }
    // 判断是否选中商品
    if(totalNum === 0) {
      wx.showToast({
        title: '您还没有选中商品',
        icon: 'none'
      })
      return
    }
    //跳转到支付页面
    wx.navigateTo({
      url: '/pages/pay/index'
    })
  },
  // 重新计算底部工具栏数据
  setCart (cart) {
    // 重新计算总价和数量
    let allChecked =true
    let totalPrice = 0
    let totalNum = 0
    cart.forEach(v => {
      if (v.checked) {
        totalPrice += v.num * v.goods_price
        totalNum += v.num
      } else {
        allChecked = false
      }
    })
    allChecked = cart.length != 0 ? allChecked : false
    this.setData({
      cart,
      totalNum,
      totalPrice,
      allChecked
    })
    wx.setStorageSync('cart', cart)
  }
})
