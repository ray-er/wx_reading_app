// components/SearchBar/SearchBar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    _searchBarWidth:{
      type:String,
      value:'100vw'
    },
    _searchType:{
      type:String,
      value:'book'
    },
    _placeholder:{
      type:String,
      value:'输入关键字查找...'
    },
    _top:{
      type:Number,
      value:0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    _btnLeft:'-15vw',
    _searchHistoryHeight:'0vh',
    keyword:'',
    searchHistoryWords:[],
    hasHisory:false,
    _historyContentHeight:'calc(100vh - 800rpx)'
  },
  lifetimes:{
    attached(){
      this.init()
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    init(){
      let keywords = wx.getStorageSync('keywords');
      let _top = this.data._top;
      this.setData({
        searchHistoryWords:keywords,
        hasHisory:keywords.length>0?true:false,
        _historyContentHeight:keywords.length>0?`calc(100vh - ${_top+260}rpx)`:'0'
      })
    },
    focusWidth(){
      let _top = this.data._top
      console.log(_top)
      this.setData({
        _searchBarWidth:'85vw',
        _btnLeft:'0',
        _searchHistoryHeight:`calc(100vh - ${_top+100}rpx)`
      })
    },
    blurWidth(){
      this.setData({
        _searchBarWidth:'100vw',
        _btnLeft:'-15vw',
        _searchHistoryHeight:'0vh'
      })
    },
    getKey(e){
      this.setData({
        keyword:e.detail.value
      })
    },
    searchByKey(e){
      let keyword = e.target.dataset.keyword
      let keywords = wx.getStorageSync('keywords')
      if(keyword.trim()=='') return;
      if(keywords.indexOf(keyword)===-1){
        // 错误
        // wx.setStorageSync('keywords', keywords.push(keyword))
        keywords[keywords.length] = keyword
        wx.setStorageSync('keywords', keywords)
        this.init()
      }
      wx.navigateTo({
        url: `../../views/search/searchResult/searchResult?keyword=${keyword}`
      })
      // 访问数据接口，跳转resultPage。
    },
    clearHistory(){
      wx.setStorageSync('keywords', []),
      this.init()
    }
  }
})
