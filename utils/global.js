
const userLogin = () => {
  return new Promise((resolve, reject) => {
    wx.login({
      success(res) {
        resolve(res)
      },
      fail (err) {
        reject(err)
      }
    })
  })
}

const getSetting = () => {
  return new Promise((resolve, reject) => {
    wx.getSetting({
      success: res => {
        console.log(res)
        resolve(res)
      }
    })
  })
}

const getUserInfo = () => {
  // console.log('getUserInfo')
  return new Promise((resolve, reject) => {
    wx.getUserInfo({
      success: res => {
        resolve(res)
        // console.log(res)
        // this.globalData.userInfo = res.userInfo
        // if (this.userInfoReadyCallback) {
        //   this.userInfoReadyCallback(res)
        // }
      }
    })
  })
}

module.exports = {
  userLogin,
  getSetting,
  getUserInfo
}