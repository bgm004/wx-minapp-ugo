import {login} from '../../utils/asyncWx'
import {request} from '../../request/index.js'
import regeneratorRuntime from '../../lib/runtime/runtime'

Page({

  data: {

  },

  onLoad: function (options) {
    
  },

  async handleGetUserInfo (e) {
    try {
      //获取用户信息
      const {encryptedData, raw, iv, signature} = e.detail
      // 获取code值
      const {code} = await login()
      //发送请求
      const data = {encryptedData, raw, iv, signature,code}
      const res = await request({url:'/users/wxlogin', data, method: 'post'})
      //把token存入缓存,跳回上一页面
      wx.setStorageSync('token', res.token)
      wx.navigateBack({
        delta: 1
      })
    } catch (err) {
      console.log(err)
    }
  },
})