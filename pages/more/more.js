// pages/more/more.js
import {wxRequest} from '../../utils/request'
import regeneratorRuntime from '../../utils/runtime.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items:[
      {
        // 导航名称
        text: '军事',
        // 禁用选项
        disabled: false,
        id:1
      },
      {
        // 导航名称
        text: '武侠',
        // 禁用选项
        disabled: false,
        id:2
      }
    ],
    activeId:null,
    mainActiveIndex:0,
    scrollBarList:[1,2,3],
    storyList:[1,1,1,1,1,1,1],
    hasLoadedAll:false,
    _contentWidth:65,
    _barLeft:0,
    flagShowBar:true,
    militaryList:[],
    swordsmanList:[]
    
  },
  showBar(){
    let flagShowBar,_contentWidth,_barLeft;
    flagShowBar = this.data.flagShowBar?false:true;
    _contentWidth = this.data._contentWidth == 100?65:100;
    _barLeft = this.data._barLeft == 0?-100:0;
    this.setData({
      flagShowBar,
      _contentWidth,
      _barLeft
    })
  },
  onClickNav({ detail = {} }){
    this.setData({
      mainActiveIndex: detail.index || 0,
    });
    console.log('nav'+detail.index)
  },
  onClickItem({ detail = {} }){
    const activeId = this.data.activeId === detail.id ? null : detail.id;
    console.log('item'+activeId)
    this.setData({ activeId });
  },
  async getBooksBycategory(category){
    let data = wxRequest('book/getBooksByCategory',{
      data:{
        category:category
      }
    })
    return data
  },
  /**
   * 生命周期函数--监听页面加载
   */
  async getStorys(){
    let res = await wxRequest('story/getStorys',{})
    return res
  },
  onLoad: async function (options) {
    let storyList = await this.getStorys()
    let swordsmanList = await this.getBooksBycategory('武侠')
    let militaryList = await this.getBooksBycategory('军事')
    swordsmanList = swordsmanList.data
    militaryList = militaryList.data
    storyList =  storyList.data
    console.log(swordsmanList)
    this.setData({
      storyList,
      swordsmanList,
      militaryList
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
  onReachBottom: async function () {
    console.log('上拉触底')
    // 最多显示20条数据。
    if(this.data.storyList.length>20){
      this.setData({
        hasLoadedAll:true
      })
      return
    }
    let res = await wxRequest('story/getStorys',{})
    this.setData({
      storyList:this.data.storyList.concat([1,1,1,1,1])
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})