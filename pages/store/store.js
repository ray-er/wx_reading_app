// pages/store/store.js
import regeneratorRuntime, { async } from '../../utils/runtime.js';
import {wxRequest} from '../../utils/request';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    navItem:[{name:'我的书架'},{name:'我的故事'}],
    storeBooks:[],
    storeStorys:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async init(){
    let openid = wx.getStorageSync('openid');
    let books = await this.getBookShelf(openid)
    let storys = await this.getStoryShelf(openid)
    console.log(storys)
    this.setData({
      storeBooks:books.data,
      storeStorys:storys.data
    })
  },
  onLoad:async function (options) {
    this.init()
  },
  async getStoryShelf(openid){
    let res = await wxRequest('story/wx_getStoryShelf',{
      data:{
        openid:openid
      }
    })
    return res;
  },
  async getBookShelf(openid){
    let res = await wxRequest('user/wx_getBookShelf',{
      data:{
        openid:openid
      }
    })
    return res;
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
    this.init()
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