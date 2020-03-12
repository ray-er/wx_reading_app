// views/story/storyContent/storyContent.js
import {wxRequest} from '../../../utils/request'
import regeneratorRuntime from '../../../utils/runtime'
import {formatTime} from '../../../utils/util'
import Dialog from '../../../vant-weapp/dialog/dialog';
import Toast from '../../../vant-weapp/toast/toast';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    storyData:{},
    commentList:[],
    story_id:'',
    hasStore:"false"
  },
  async hasStoreStory(story_id){
    let openid = wx.getStorageSync('openid')
    let data = await wxRequest('story/hasStoreStory',{
      data:{
        story_id,openid
      }
    })
    console.log(data)
    return data.flag
  },
  async addStory(){
    const openid = wx.getStorageSync('openid')
    const story_id =  this.data.story_id
    await wxRequest('story/addStory',{
      method:'post',
      hideLoading:true,
      data:{
        story_id,
        openid
      }
    })
    var _ = this
    this.setData({
      hasStore:true
    })
    Toast({
      type:"success",
      selector:"#toastAddInfo",
      context:_,
      message:'添加成功',
      onClose: () => {
       
      }
    })
  },
  async removeStory(){
    var _ = this
    Dialog.confirm({
      title: '确认移除',
      message: '您真的不想收藏了吗',
      selector:"#dialogRemove",
      context:this
    }).then(async() => {
      const openid = wx.getStorageSync('openid')
      const story_id =  this.data.story_id
      await wxRequest('story/removeStory',{
        method:'post',
        hideLoading:true,
        data:{
          story_id,
          openid
        }
      })
      _.setData({
        hasStore:false
      })
      Toast({
        type:"success",
        selector:"#toastRemoveInfo",
        context:_,
        message:'成功移除',
        onClose: () => {
         _.setData({
           hasStore:false
         })
        }
      })
    }).catch(()=>{

    });
   
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
    for(let i=0;i<commentList.length;i++){
      commentList[i].comment_time = formatTime(new Date(commentList[i].comment_time))
    }
    console.log(commentList)
    this.setData({
      commentList
    })
  },
  onLoad: async function (options) {
    let {story_id} = options
    console.log(story_id)
    let storyData = await this.getStoryContent(story_id)
    let commentList = await this.getComments(story_id)
    let hasStore = await this.hasStoreStory(story_id)
    console.log('....'+hasStore)
    this.setData({
      storyData,commentList,story_id,hasStore
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