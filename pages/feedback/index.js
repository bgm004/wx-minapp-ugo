Page({

  data: {
    chooseImgs: [],
    textVal: '',
    tabs: [
      {
        id: 0,
        value: '体验问题',
        isActive: true
      },
      {
        id: 1,
        value: '商品/商家投诉',
        isActive: false
      }
    ]
  },

  // 图片上传后返回的地址
  UpLoadImgs: [],

  onLoad: function (options) {

  },

  onShow: function () {

  },
  //切换tabs
  handleTabsItemChange (e) {
    const {index} = e.detail
    let {tabs} = this.data
    tabs.forEach((v,i)=> i === index ? v.isActive=true : v.isActive=false)
    this.setData({
      tabs
    })
  },
  // 选中图片
  handleChooseImg () {
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        this.setData({
          chooseImgs: [...this.data.chooseImgs,...res.tempFilePaths]
        })
      }
    })
  },
  // 删除图片
  handleRemoveImg (e) {
    const {index} = e.currentTarget.dataset
    let {chooseImgs} = this.data
    chooseImgs.splice(index,1)
    this.setData({
      chooseImgs
    })
  },
  // 文本域的输入事件
  handleTextInput (e) {
    this.setData({
      textVal:e.detail.value
    })
  },
  // 提交按钮
  handleFromSubmit () {
    // 获取文本域的内容
    const {textVal,chooseImgs} = this.data
    if (!textVal.trim()) {
      wx.showToast({
        title: '内容不能为空',
        icon: 'none',
        mask: true
      })
      return
    }
    // 将图片上传
    // 判断是否需要上传图片
    /* if (chooseImgs.length > 0){
      wx.showLoading({
        title: '正在上传图片',
        mask: true
      })
      chooseImgs.forEach((v,i)=>{
        wx.uploadFile({
          url: '',
          filePath: v,
          name: 'file',
          success: (result) => {
            let url = JSON.parse(result.data).url
            this.UpLoadImgs.push(url)
            // 所有图片都上传完才触发
            if (i === chooseImgs.length-1) {
              wx.hideLoading()
              // 把文本和图片数组都提交到服务器
              //重置页面
              this.setData({
                textVal: '',
                chooseImgs: []
              })
              // 返回上一个页面
              wx.navigateBack()
            }
          }
        })
      })
    } else {
      //只提交文本
      wx.hideLoading()
      // 返回上一个页面
      wx.navigateBack()
    } */
  }
})