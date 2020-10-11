// promise形式的getSetting
export const getSetting = ()=>{
  return new Promise((resolve, reject)=>{
    wx.getSetting({
      success: (result) => {
        resolve(result)
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}
// promise形式的chooseAddress
export const chooseAddress = ()=>{
  return new Promise((resolve, reject)=>{
    wx.chooseAddress({
      success: (result) => {
        resolve(result)
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}
// promise形式的openSetting
export const openSetting = ()=>{
  return new Promise((resolve, reject)=>{
    wx.openSetting({
      success: (result) => {
        resolve(result)
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}
// promise形式的login
export const login = ()=>{
  return new Promise((resolve, reject)=>{
    wx.login({
      timeout: 10000,
      success: (result) => {
        resolve(result)
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}
// promise形式的requestPayment
export const requestPayment = (pay)=>{
  return new Promise((resolve, reject)=>{
    wx.requestPayment({
      ...pay,
      success: (result) => {
        resolve(result)
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}
// promise形式的showToast
export const showToast = ()=>{
  return new Promise((resolve, reject)=>{
    wx.showToast({
      title,
      icon: 'none',
      success: (res) => {
        resolve(res)
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}