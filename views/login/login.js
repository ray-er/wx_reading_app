// pages/login/login.js
import regeneratorRuntime from '../../utils/runtime.js';
import {wxRequest} from '../../utils/request';
import { userLogin,  getUserInfo  } from '../../utils/global.js';
const app = getApp();
Page({
  data: {

  },
  bindGetUserInfo (res) {
    const { detail } = res
    if (!detail.hasOwnProperty('iv')) {
      return
    }
    wx.showLoading({
      title: '正在获取用户信息'
    })
    this.handleLogin()
    wx.hideLoading()
    wx.switchTab({
      url: '../../pages/index/index',
    })
  },
  async handleLogin () {
    // 获取本次登录的唯一code
    const { code } = await userLogin()
    const { userInfo } = await getUserInfo()
    const ret = await wxRequest('user/wx_login', {
      data: {
        code,
        userInfo: JSON.stringify(userInfo)
      },
      method:'POST'
    })
    console.log()
    // 存储相应数据到本地缓存。
    const {openid,session_key} = ret.data
    wx.setStorageSync('openid', openid)
    wx.setStorageSync('token', session_key)
    app.globalData.userInfo = userInfo
    console.log(userInfo)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})