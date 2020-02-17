// views/book/bookContent/bookContent.js
import {wxRequest} from "../../../utils/request";
import regeneratorRuntime, { async } from '../../../utils/runtime'
import {renewObject} from '../../../utils/util';
import Dialog from '../../../vant-weapp/dialog/dialog';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flagShowCatalog:false,
    flagShowSet:false,
    fontSize:36,
    dotLeft:60,
    sliderValue:50,
    // chapter
    chapter_id:'bkc002',
    content_id:0,
    paragraphs:[],
    chapterList:[],
    chapterListLength:0,
    currentChapterIndex:1,
    // book
    bookData:{
      book_id:'book1',
      book_name:'斗破苍穹斗破苍穹斗破苍穹',
      author:'天蚕土豆',
      book_tip:'猜您喜欢',
      book_coverImage:"../../assets/coverImg/cover.png",
      book_introduction:'',
      category:'',
    },
    // flag
    flagFirstLoad:true,
    flagShowDesc:true
  },
  // bookDesc
  showIntroDialog(){
    let _ = this
    Dialog.alert({
      title: '简介',
      message: _.data.bookData.book_introduction,
      selector:"#dialogDesc",
      context:this
    }).then(() => {
      // on close
    });
  },
  // bookPage
  scrollToTop(){
    wx.pageScrollTo({
      scrollTop: 0
    })
  },
  async getBookDetail(book_id){
    let ret= wxRequest('book/getBookDetail',{
      data:{
        book_id:book_id
      }
    })
    return ret
  },
  toPrevChapter(){
    let currentContentId = this.data.content_id;
    let contentID = currentContentId -1<0?0:currentContentId -1;
    this.setData({
      content_id:contentID
    })
    this.onShow()
  },
  toNextChapter(){
    let len = this.data.chapterListLength;
    let currentContentId = this.data.content_id
    currentContentId = currentContentId+ 1>len?len:currentContentId+1;
    this.setData({
      content_id:currentContentId
    })
    this.onShow();
  },
  async toPointChapter(e){
    let contentID =  e.currentTarget.dataset.chapterindex;
    this.setData({
      content_id:contentID,
      flagShowCatalog:false
    })
    this.onShow()
  },
  startReading(){
    this.setData({
      content_id:1,
      flagShowDesc:false
    })
    this.onShow()
  },
  changeFontSize(e){
    let percent = e.detail;
    this.setData({
      sliderValue:e.detail,
      fontSize:26 + percent*20/100
    })
    // 计算属性，限定最大，最小值。
    // let {clientX} = e.touches[0]
    // // 60vw 375*0.6 225
    // // 375 - 225 = 150 ,75
    // let percent =  (clientX - 75)/225*100
    // if(percent>=100){
    //   percent = 100;
    // }else if(percent<=0){
    //   percent = 0;
    // }
    // console.log(percent)
    // this.setData({
    //   dotLeft:percent,
    //   fontSize:26 + percent * 20 / 100
    // })
    // console.log(clientX)
  },
  async getChapterList(chapter_id){
    var ret = await wxRequest('book/getChapterList',{
      data:{
        chapter_id:chapter_id
      }
    })
    return ret;
    
  },
  async getChapterContent(chapter_id,chapter_contentID){
    var ret = await wxRequest('book/getChapterContent',{
      data:{
        chapter_id:chapter_id,
        chapter_contentID:chapter_contentID
      }
    })
    return ret;
  },
  onLoad: async function (options) {
    // 加载列表，加载第一页的数据。
    let {book_id,chapter_id} = options
    console.log(options)
    let bookData = await this.getBookDetail(book_id);
  
    let chapterList = await this.getChapterList(chapter_id);
    

    let chapterContent = await this.getChapterContent(chapter_id,1)

    let {chapter_content='',chapter_name='', chapter_contentID=1}  = chapterContent.content

    this.setData({
      paragraphs:chapter_content.split(/\s+/g),
      chapter_name:chapter_name,
      content_id:chapter_contentID,
      chapterList:chapterList.chapterList,
      chapterListLength:chapterList.chapterList.length,
      bookData:bookData.data,
      chapter_id:chapter_id
    })
    wx.setNavigationBarTitle({
      title: this.data.bookData.book_name
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
  onShow:async function () {
    let current_content_id = this.data.content_id;
    let book_chapterID = this.data.chapter_id;
    
    if(this.data.flagFirstLoad) {
      this.setData({
        flagFirstLoad:false
      })
    }else{
      if(current_content_id==0) return;
      var chapterContent = await this.getChapterContent(book_chapterID,current_content_id)
      const {chapter_content,chapter_name, chapter_contentID:contentID}  = chapterContent.content
      this.setData({
        paragraphs:chapter_content.split(/\s+/g),
        chapter_name:chapter_name,
        content_id:contentID
      })
      // 回到顶部
      wx.pageScrollTo({
        scrollTop: 0
      })
    }
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