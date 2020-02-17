// components/BottomTool/BottomTool.js
import regeneratorRuntime, { async } from '../../utils/runtime'
import {wxRequest} from '../../utils/request'
import Dialog from '../../vant-weapp/dialog/dialog';
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  // 启用slot别名的时候，一定需要开启这个选项
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  properties: {
    flagShowCatalog:{
      type:Boolean,
      value:false
    },
    flagShowSet:{
      type:Boolean,
      value:false
    },
    book_id:{
      type:Number,
      value:1
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    hasAdd:false,
    // flagShowCatalog:false,
    // flagShowSet:false
  },
  lifetimes: {
    attached: function() {
      // 在组件实例进入页面节点树时执行
    },
    detached: function() {
      // 在组件实例被从页面节点树移除时执行
    },
    created:function(){
      this.init()
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    fn(){
      console.log(0)
    },
    async init(){
      var _ = this
      const openid = wx.getStorageSync('openid')
      // 因为子组件的加载快，所以获取不到父组件的传递过来的book_id，所以我选择使用缓存
      const book_id = wx.getStorageSync('book_id')
      // 获取存取当前book_id
      console.log(book_id)
      let res = await wxRequest('user/wx_hasStoreBook',{
        data:{
          book_id:book_id,
          openid:openid
        }
      })
      console.log(res)
      this.setData({
        hasAdd:res.hasAdd
      })
    },
    hideMask(){
      this.setData({
        flagShowCatalog:false,
        flagShowSet:false
      })
    },
    showCatalog(){
      this.setData({
        flagShowCatalog:!this.data.flagShowCatalog,
        flagShowSet:false
      })
      
    },
    showSet(){
      this.setData({
        flagShowSet:!this.data.flagShowSet,
        flagShowCatalog:false
      })
    },
    async addBook(){
      const openid = wx.getStorageSync('openid')
      const book_id =  wx.getStorageSync('book_id')
      await wxRequest('user/wx_addBook',{
        data:{
          book_id:book_id,
          openid:openid
        }
      })
      var _ = this
      wx.showToast({
        title: '添加成功',
        success(){
          _.setData({
            hasAdd:true
          })
        }
      })
      
    },
    async removeBook(){
      var _ = this
      Dialog.confirm({
        title: '确认删除',
        message: '您真的要移除本书籍吗',
        selector:"#dialogRemove",
        context:this
      }).then(async() => {
        // on close
        // 请求接口。
        const openid = wx.getStorageSync('openid')
        const book_id =  wx.getStorageSync('book_id')
        let res =await wxRequest('user/wx_removeBook',{
          data:{
            book_id:book_id,
            openid:openid
          }
        })
        wx.showToast({
          title: '移除成功',
          success(){
            _.setData({
              hasAdd:false
            })
          }
        })
       
      }).catch(()=>{

      });
     
    }
  }
})
