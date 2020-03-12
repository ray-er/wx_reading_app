// components/Comment/Comment.js
import regeneratorRuntime, { async } from '../../utils/runtime'
import {wxRequest} from '../../utils/request'
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    story_id:{
      type:String,
      value:''
    },
    commentList:{
      type:Array,
      value:[
      ]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    _myComment:'',
    sortFlag:false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getMyComment(e){
      this.setData({
        _myComment:e.detail
      })
    },
    sortByGood(){
      let _commentList = this.data.commentList;
      
    },
    async sendComment(e){
      let openid = wx.getStorageSync('openid')
      console.log(this.data._myComment)
      let comment_content = this.data._myComment
      let story_id = this.data.story_id
      console.log(app.globalData.userInfo)
      let {nickName,avatarUrl} = app.globalData.userInfo
      let res = await wxRequest('story/sendComment',{
        method:'POST',
        data:{
          comment_content,
          openid,
          story_id,
          nickName,
          avatarUrl
        },
        hideLoading:true
      })
      wx.showToast({
        title: '发表成功'
      })

      // 触发父组件重新获取 评论表
      this.triggerEvent('getComments',{},{})
      console.log(res)
    }
  }
})
