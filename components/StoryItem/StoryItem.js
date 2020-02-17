// components/StoryItem/StoryItem.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    storyData:{
      type:Object,
      value:{
        story_id:'story1',
        story_name:'哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈',
        story_source:'微信',
        story_coverImg:'../../assets/coverImg/cover.png',
        story_tag:'NBA'
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
    _toStoryDetail(){
      // let story_id = this.data.storyData.story_id;
      // var myEventDetail = {
      //   story_id:story_id
      // }
      // var myEventOption = {} 
      // this.triggerEvent('toStoryDetail', myEventDetail, myEventOption)
      wx.navigateTo({
        url: `../../views/story/storyContent/storyContent?story_id=${this.data.storyData.story_id}`
      })
    }
  }
})
