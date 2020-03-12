// views/book/bookContent/bookContent.js
import {wxRequest} from "../../../utils/request";
import regeneratorRuntime, { async } from '../../../utils/runtime'
import {renewObject} from '../../../utils/util';
import Dialog from '../../../vant-weapp/dialog/dialog';
import Toast from '../../../vant-weapp/toast/toast';
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
      book_name:'',
      author:'',
      book_tip:'',
      book_coverImage:"",
      book_introduction:'',
      category:'',
    },
    // flag
    flagFirstLoad:true,
    flagShowDesc:true,
    // 页面高度以及最后读取的章节。
    bookScrollTop:0,
    destChapter:1
  },
  // 获取滚动条高度，做阅读器功能
onPageScroll:function(e){
    console.log('scrollTop'+e.scrollTop) //这个就是滚动到的位置,可以用这个位置来写判断
    this.setData({
      bookScrollTop:e.scrollTop
    })
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
      },
      hideLoading:true
    })
    return ret
  },
  toPrevChapter(){
    let currentContentId = this.data.content_id;
    let contentID = currentContentId -1<0?0:currentContentId -1;
    this.setData({
      content_id:contentID,
      destChapter:content_id,
      bookScrollTop:0
    })
    this.onShow()
  },
  toNextChapter(){
    let len = this.data.chapterListLength;
    let currentContentId = this.data.content_id
    currentContentId = currentContentId+ 1>len?len:currentContentId+1;
    this.setData({
      content_id:currentContentId,
      destChapter:currentContentId,
      bookScrollTop:0
    })
    this.onShow();
  },
  async toPointChapter(e){
    let contentID =  e.currentTarget.dataset.chapterindex;
    this.setData({
      content_id:contentID,
      flagShowCatalog:false,
      destChapter:contentID,
      bookScrollTop:0
    })
    this.onShow()
  },
  async startReading(){
    let openid = wx.getStorageSync('openid')
    let book_id = this.data.bookData.book_id;
    let content_id = 1,bookScrollTop = 0;
    let progress = await this.getProgress(openid,book_id);
    if(progress){
      content_id = progress.destChapter;
      bookScrollTop  = progress.bookScrollTop;
      // 添加提示
      Toast({
        context:this,
        selector:'#toast-progress',
        message:'将自动跳转到您上次阅读的地方!'
      })
    }
    this.setData({
      content_id:content_id,
      bookScrollTop:bookScrollTop,
      flagShowDesc:false
    })
    var _this = this
    setTimeout(()=>{
      _this.onShow();
    },1000)
    // this.onShow()
  },
  changeFontSize(e){
    let percent = e.detail;
    this.setData({
      sliderValue:e.detail,
      fontSize:26 + percent*20/100
    })
  },
  async getChapterList(chapter_id){
    var ret = await wxRequest('book/getChapterList',{
      data:{
        chapter_id:chapter_id
      },
      hideLoading:true
    })
    return ret;
    
  },
  async getChapterContent(chapter_id,chapter_contentID){
    var ret = await wxRequest('book/getChapterContent',{
      data:{
        chapter_id:chapter_id,
        chapter_contentID:chapter_contentID,
      },
      hideLoading:true
    })
    return ret;
  },
  async getProgress(openid,book_id){
    let data = await wxRequest('book/getProgress',{
      data:{
        openid:openid,
        book_id:book_id
      },
      hideLoading:true
    })
    return data.progress[0]
  },
  onLoad: async function (options) {
    console.log('load')
    // 加载列表，加载第一页的数据。
    let {book_id,chapter_id} = options
    let openid = wx.getStorageSync('openid')
    let progress = await this.getProgress(openid,book_id)
    let bookScrollTop = 0
    let content_id = 1;
    if(progress){
      content_id = progress.destChapter
      bookScrollTop = progress.bookScrollTop
       console.log(content_id)
    }
    console.log(progress)
    let bookData = await this.getBookDetail(book_id);
  
    let chapterList = await this.getChapterList(chapter_id);
    
    let chapterContent = await this.getChapterContent(chapter_id,content_id)
    console.log(chapterContent)
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
    console.log('show')
    let current_content_id = this.data.content_id;
    let book_chapterID = this.data.chapter_id;
    let bookScrollTop = this.data.bookScrollTop
    console.log('current_content_id'+current_content_id)
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
        scrollTop: bookScrollTop
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log('hide')
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload:async function () {
      // 保存book_id,content_id,对应的高度
      let {bookScrollTop,content_id,bookData} = this.data
      console.log(bookScrollTop,content_id,bookData.book_id)
      let requestData = {
        bookScrollTop:bookScrollTop,
        destChapter:content_id,
        book_id:bookData.book_id,
        openid :wx.getStorageSync('openid')
      }
      console.log(requestData)
      let data = await wxRequest('book/saveProgress',{
        method:'post',
        data:requestData,
        hideLoading:true
      })
      console.log(data)
      // 发送给服务端
      // 
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