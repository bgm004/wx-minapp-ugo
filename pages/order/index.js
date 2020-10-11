import {request} from '../../request/index.js'
import regeneratorRuntime from '../../lib/runtime/runtime'

Page({

  data: {
    orders: [],
    tabs: [
      {
        id: 0,
        value: '全部',
        isActive: true
      },
      {
        id: 1,
        value: '待付款',
        isActive: false
      },
      {
        id: 2,
        value: '待发货',
        isActive: false
      },
      {
        id: 3,
        value: '退货/退款',
        isActive: false
      }
    ]
  },

  onLoad: function (options) {
    
  },

  onShow () {
    // 任何需要token的请求都必须先判断有没有token
   /*  const token = wx.getStorageSync('token')
    // 没有token就跳转到授权页面获取token
    if (!token) {
      wx.navigateTo({
        url: '/pages/auth/index'
      })
      return
    } */
    let pages = getCurrentPages()
    let currentPage = pages[pages.length-1]
    const {type} = currentPage.options
    // 激活选中页面标题
    this.changeTitleByIndex(type-1)
    this.getOrders(type)
  },
  //获取订单列表方法
  async getOrders (type) {
    /* const res = await request({url: '/my/orders/all', data:{type}})
    this.setData({
      orders:res.orders.map(v=>({...v,create_time_cn:(new Date(create_time*1000).toLocaleString())}))
    })  */
  },

  //根据标题索引激活标题
  changeTitleByIndex (index) {
    let {tabs} = this.data
    tabs.forEach((v,i)=> i === index ? v.isActive=true : v.isActive=false)
    this.setData({
      tabs
    })
  },

  handleTabsItemChange (e) {
    const {index} = e.detail
    this.changeTitleByIndex(index)
    // tab项改变 重新发送请求
    this.getOrders(index+1)
  }

})