// pages/category/index.js
import {request} from '../../request/index.js'
import regeneratorRuntime from '../../lib/runtime/runtime'

Page({
  data: {
    leftMenuList: [],
    rightContent: [],
    currentIndex: 0,
    scrollTop: 0
  },
  //接口返回的数据
  cates: [],

  onLoad: function (options) {
    const Cates = wx.getStorageSync('cates')
    //判断是否有本地缓存
    if(!Cates){
      this.getCates()
    } else {
      if(Date.now() - Cates.time>1000*60*60){
        this.getCates()
      } else {
        this.cates = Cates.data
        //构造左侧菜单数据
        let leftMenuList = this.cates.map(v=>v.cat_name)
        //构造左侧菜单数据
        let rightContent = this.cates[0].children
        this.setData({
          leftMenuList,
          rightContent
        })
      }
    }
  },
  //获取分类数据
  async getCates () {
    const res = await request({url:'/categories'})
    this.cates = res
    //本地缓存
    wx.setStorageSync("cates", {time:Date.now(),data:this.cates})
    //构造左侧菜单数据
    let leftMenuList = this.cates.map(v=>v.cat_name)
    //构造左侧菜单数据
    let rightContent = this.cates[0].children
    this.setData({
      leftMenuList,
      rightContent
    })
  },
  //左侧菜单点击事件
  handleItemTp (e) {
    const {index} = e.currentTarget.dataset
    //构造左侧菜单数据
    let rightContent = this.cates[index].children
    this.setData({
      currentIndex: index,
      rightContent,
      scrollTop:0
    })
  }
})