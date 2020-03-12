// views/user/userEdit/userEdit.js

import _areaList from "../../../utils/area"
import regeneratorRuntime from '../../../utils/runtime.js'
import { wxRequest} from "../../../utils/request"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickName:"",
    gender:'',
    city:'',
    province:'',
    address:'',
    flagShowArea:false,
    areaList:{
      province_list: {
        110000: '北京市',
        120000: '天津市'
      },
      city_list: {
        110100: '北京市',
        110200: '县',
        120100: '天津市',
        120200: '县'
      },
      county_list: {
        110101: '东城区',
        110102: '西城区',
        110105: '朝阳区',
        110106: '丰台区',
        120101: '和平区',
        120102: '河东区',
        120103: '河西区',
        120104: '南开区',
        120105: '河北区',
        // ....
      }
    },
    avatarUrl:''

  },
  async _getUserInfo(){
    let openid = wx.getStorageSync('openid')
    const res = await wxRequest('user/wx_getUserInfo',{
      data:{
        openid:openid
      }
    })
    return res.data
  },
  updateNickName(e){
    this.setData({
      nickName:e.detail
    })
  },
  updateGender(e){
    this.setData({
      gender:e.detail
    })
  },
 
  async updateUserInfo(){
    let openid = wx.getStorageSync('openid')
    let {city,province,gender,nickName} = this.data;
    await wxRequest('user/wx_updateUserInfo',{
      method:'post',
      data:{
        gender,
        nickName,
        city,province,
        openid
      }
    })
  },
  async severeMsg(){
    this.updateUserInfo()
  },
  chooseImage(){
    var _ = this
    wx.navigateTo({
      url: './userAvatar/userAvatar?avatarUrl='+_.data.avatarUrl,
    })
  },
  showAddressDialog(){
    this.setData({
      flagShowArea:true
    })
  },
  hideArea(){
    this.setData({
      flagShowArea:false
    })
  },
  selectAddress(e){
    let values = e.detail.values
    this.setData({
      province:values[0].name,
      city:values[1].name,
      flagShowArea:false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    // 初始化本地数据。
    let userInfo = await this._getUserInfo();
    console.log(userInfo)
    let {gender,nickName,avatarUrl,city,province} = userInfo
    gender= (gender==1)?'男':'女'
    
    this.setData({
      areaList:_areaList,
      avatarUrl,
      gender,
      nickName,
      city,province
    })
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