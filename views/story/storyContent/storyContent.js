// views/story/storyContent/storyContent.js
import {wxRequest} from '../../../utils/request'
import regeneratorRuntime from '../../../utils/runtime'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    storyData:{},
    commentList:[],
    story_id:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async getStoryContent(id){
    const res = await wxRequest('story/getStoryDetail',{
     data:{
      story_id:id
     } 
    })
    let storyData = res.data
    storyData.paragraphs = storyData.story_content.split(/\s+/g)
    return storyData
    
  },
  async getComments(story_id){
    let openid = wx.getStorageSync('openid')
    let res = await wxRequest('story/getStoryComments',{
      data:{
        story_id,openid
      },
      hideLoading:true
    })
    let commentList = res.data
    return commentList
  },
  async refreshComment(){
    let story_id = this.data.story_id
    let commentList = await this.getComments(story_id)
    this.setData({
      commentList
    })
  },
  onLoad: async function (options) {
    let {story_id} = options
    let storyData = await this.getStoryContent(story_id)
    let commentList = await this.getComments(story_id)
    this.setData({
      storyData,commentList,story_id
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