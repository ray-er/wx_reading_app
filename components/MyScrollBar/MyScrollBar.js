// components/MyScrollBar/MyScrollBar.js
Component({
  /**
   * 组件的属性列表
   */
  lifetimes:{
    attached(){
      this.setData({
        scrollBarWidth:this.data.scrollBarList.length*64 + 'vw'
      })
    }
  },
  properties: {
    scrollBarList:{
      type:Array,
      value:['11','33','22']
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    scrollBarWidth:''
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
