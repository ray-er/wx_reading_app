// views/user/userSet/setAbout/setAbout.js
import Dialog from '../../../../vant-weapp/dialog/dialog';
import {wxRequest} from "../../../../utils/request";
import regeneratorRuntime, { async } from '../../../../utils/runtime'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeName: '1',
    functions:`1. 查看书籍/故事 \n
               2. 收藏书籍/故事 \n 
               3. 发表评论`,
    show:false,
    message:'',
    rate:5
  },
  onChange(event) {
    this.setData({
      rate: event.detail
    });
  },
  close(){
    this.setData({
      message:'',
      show:false
    })
  },
  async commitDiss(){
    let {message,rate} = this.data
    await wxRequest('/user/diss',{
      data:{
        rate,message
      }
    })
  },
  bindFormSubmit(e){
    console.log(e.detail.value.textarea)
  },
  showPopup() {
    this.setData({ show: true });
  },
  onClose() {
    this.setData({ show: false });
  },
  showFunction(){
    let _ = this
    Dialog.alert({
      title: '功能介绍',
      message: _.data.functions,
      selector:"#dialogFunction",
      context:this
    }).then(() => {
      // on close
    });
  },
  onChange(event) {
    this.setData({
      activeName: event.detail
    });
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