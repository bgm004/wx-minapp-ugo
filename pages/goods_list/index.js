import {request} from '../../request/index.js'
import regeneratorRuntime from '../../lib/runtime/runtime'

Page({
  data: {
    tabs: [
      {
        id: 0,
        value: '综合',
        isActive: true
      },
      {
        id: 1,
        value: '销量',
        isActive: false
      },
      {
        id: 2,
        value: '价格',
        isActive: false
      },
    ],
    goodsList: []
  },
  QuerParms:{
    query: '',
    cid: '',
    pagenum: 1,
    pagesize: 10
  },
  //总页数
  totalPages: 1,

  onLoad: function (options) {
    this.QuerParms.cid = options.cid || ''
    this.QuerParms.query = options.query || ''
    this.getGoodsList()
  },
  onReachBottom() {
    if(this.QuerParms.pagenum >= this.totalPages) {
      wx.showToast({title: '到底了'})
    }else{
      this.QuerParms.pagenum++
      this.getGoodsList()
    }
  },
  onPullDownRefresh () {
    this.setData({
      gooodsList: []
    })
    this.QuerParms.pagenum = 1
    this.getGoodsList()
  },

  async getGoodsList () {
    const res = await request({url:'/goods/search',data:this.QuerParms})
    const total = res.total
    this.totalPages = Math.ceil(total/this.QuerParms.pagesize)
    this.setData({
      goodsList: [...this.data.goodsList,...res.goods]
    })
    //关闭下拉刷新窗口
    wx.stopPullDownRefresh()
  },

  handleTabsItemChange (e) {
    const {index} = e.detail
    let {tabs} = this.data
    tabs.forEach((v,i)=> i === index ? v.isActive=true : v.isActive=false)
    this.setData({
      tabs
    })
  }
})
