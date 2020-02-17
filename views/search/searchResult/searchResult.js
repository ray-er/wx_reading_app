// views/search/searchResult/searchResult.js
import regeneratorRuntime from '../../../utils/runtime.js'
import { wxRequest} from "../../../utils/request"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookList:[],
    storyList:[],
    hasKeyBook:false,
    hasKeyStory:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    let keyword = options.keyword;
    let bookList = await wxRequest('book/getBookByKeyword',{
      data:{
        keyword:keyword
      }
    })
    let storyList = await wxRequest('story/getStoryByKeyword',{
      data:{
        keyword:keyword
      }
    })
    bookList = bookList.bookList;
    storyList = storyList.storyList;
    let hasKeyBook = bookList.length>0?true:false;
    let hasKeyStory = storyList.length>0?true:false;
    this.setData({
      bookList,
      storyList,
      hasKeyBook,
      hasKeyStory
    })
    console.log(bookList)
    console.log(storyList)
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