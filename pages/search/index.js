import {request} from '../../request/index.js'
import regeneratorRuntime from '../../lib/runtime/runtime'


Page({

  data: {
    goods: [],
    inputvalue: '',
    isFocus: false
  },

  TimeId: -1,

  onLoad: function (options) {

  },

  onShow: function () {

  },

  // 输入框值改变触发
  handleInput (e) {
    // 获取输入框的值
    const {value} = e.detail
    if (!value.trim()) {
      // 值为空
      this.setData({
        goods: [],
        isFocus: true
      })
      return
    }
    this.setData({isFocus: true})
    clearTimeout(this.TimeId)
    this.TimeId = setTimeout(()=> {
      this.qsearch(value)
    },1000)
  },
  // 发送请求获取商品数据
  async qsearch (query) {
    const res = await request({url: '/goods/qsearch',data:{query}})
    this.setData({goods:res})
  },
  handleCancel () {
    this.setData({
      inputvalue: '',
      isFocus: false,
      goods: []
    })
  },
})