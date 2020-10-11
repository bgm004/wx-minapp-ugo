//Page Object
import {request} from '../../request/index.js'
import regeneratorRuntime from '../../lib/runtime/runtime'

Page({
  data: {
    swiperList: [],
    catesList: [],
    floorList: []
  },
  onLoad: function(options){
    this.getSwiperList()
    this.getCateList()
    this.getFoolrList()
  },
  async getSwiperList () {
    const res = await request({url:'/home/swiperdata'})
    this.setData({
      swiperList:res
    })
  },
  //获取导航数据
  async getCateList () {
    const res = await request({url:'/home/catitems'})
    this.setData({
      catesList:res
    })
  },
  async getFoolrList () {
    const res = await request({url:'/home/floordata'})
    this.setData({
      floorList:res
    })
    request({url:'/home/floordata'})
  }
});