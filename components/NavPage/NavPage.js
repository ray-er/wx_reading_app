// components/TopNavPage/TopNavPage.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    navItem: Array,
    _top:{
      type:String,
      value:'0rpx'
    }
  },
  /*
   * 在组件定义时的选项中启用多slot支持
   */
  options: {
    multipleSlots: true
  },
  /**
   * 组件的初始数据
   */
  data: {
    activeItem: 0,
    touchInitClientX: 0,
    touchINitClientY: 0,
    scrollerDirection: 0, // 0 向左滑 1 向右滑
    touchS: [0, 0],
    touchE: [0, 0],
  },

  /**
   * 组件的方法列表
   */
  methods: {
    eNavItem (e) {
      // console.log('e.target.dataset.index:', e.target.dataset.index)
      this.setData({
        activeItem: e.target.dataset.index
      })
    },
    touchstart (e) {
      const {pageX,pageY} = e.touches[0]
      this.data.touchS = [pageX, pageY]
    },
    touchMove: function (e) {
      const {pageX,pageY} = e.touches[0]
      this.data.touchE = [pageX, pageY]
    },
    touchend (e) {
      const { activeItem, touchInitClientX, navItem } = this.data
      let _activeItem = activeItem
      let _scrollerDirection = 0

      let start = this.data.touchS
      let end = this.data.touchE

      if (end[0] - start[0] > 100) {
        _activeItem = activeItem > 0 ? activeItem-1 : activeItem
        _scrollerDirection = 1
      } else if(start[0] - end[0]> 100){
        _activeItem = activeItem < navItem.length-1 ? activeItem + 1 : activeItem
        _scrollerDirection = 0
      }
      this.setData({
        activeItem: _activeItem,
        scrollerDirection: _scrollerDirection
      })
    }
  }
})
