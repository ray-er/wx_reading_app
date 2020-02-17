// components/BookItem/BookItem.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    bookType:{
      type:Number,
      value:3
    },
    bookData:{
      type:Object,
      value:{
        book_id:'book1',
        book_name:'斗破苍穹斗破苍穹斗破苍穹',
        author:'天蚕土豆',
        book_tip:'猜您喜欢',
        book_coverImage:"../../assets/coverImg/cover.png",
        book_introduction:'',
        category:'',
        chapter_id:''
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    _toBookDetail:function(e){
      // var myEventDetail = {
      //   bookId:this.data.bookData.bookId,
      // } // detail对象，提供给事件监听函数
      // var myEventOption = {} // 触发事件的选项
      // this.triggerEvent('toBookDetail', myEventDetail, myEventOption)
      console.log(e)
      let book_id = e.currentTarget.dataset.book_id
      let chapter_id = e.currentTarget.dataset.chapter_id
      wx.setStorageSync('book_id', book_id)
      wx.navigateTo({
        url: `../../views/book/bookContent/bookContent?book_id=${book_id}&chapter_id=${chapter_id}`
      })
    }
  }
})
