// components/StoryBottomTool/StoryBottomTool.js
import Toast from "../../vant-weapp/toast/toast"
import Dialog from "../../vant-weapp/dialog/dialog"
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    hasLike:true,
    hasStar:true,
    comment_num:325,
    flagShowComment:true
  },

  /**
   * 组件的方法列表
   */
  methods: {
    reomveLike(){
      this.setData({
        hasLike:false
      })
    },
    confirmLike(){
      this.setData({
        hasLike:true
      })
      Toast({
        context:this,
        selector:'#van-toast-confirmLike',
        message:'感谢您的like!'
      })
    },
    showCommentBox(){
      this.setData({
        flagShowComment:true
      })
    },
    hideCommentBox(){
      this.setData({
        flagShowComment:false
      })
    },
  }
})
