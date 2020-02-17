import {wxRequest} from '../../../../utils/request';
import regeneratorRuntime from '../../../../utils/runtime.js';
Page({
  data: {
      src:'',
      src_cut:'',
      width:250,//宽度
      height: 250,//高度
  },
  cb(obj){
    
  },
  confirmChoose(){
    // 调用接口，修改头像，返回上层。
    var _ = this
    console.log('confirm')
    this.cropper.getImg((res)=>{
      // 把res.url上传到后台
      wx.uploadFile({
        url: 'http://127.0.0.1:3000/user/updateAvatar', //仅为示例，非真实的接口地址
        filePath: res.url,
        name: 'file',
        formData: {
          'openid': wx.getStorageSync('openid')
        },
        header:{
          'content-type':'multipart/form-data'
        },
        success (res){
          console.log('success')
          let {downUrl} = JSON.parse(res.data)
          wx.navigateTo({
            url: '../userEdit?avatarUrl='+ downUrl,
          })
          
        },
        fail(res){
          console.log('fail')
          console.log(res)
        },
        complete(res){
          console.log(res)
        }
      })
     
    })
   
  },
  cancelChoose(){
    // 返回上层
    wx.navigateTo({
      url: '../userEdit',
    })
  },
  chooseImage(){
    this.cropper.upload();
  },
  onLoad: function (options) {
    let avatarUrl = options.avatarUrl
      //获取到image-cropper实例
      this.cropper = this.selectComponent("#image-cropper");
      //开始裁剪
      this.setData({
          src:avatarUrl,
      });
      wx.showLoading({
          title: '加载中'
      })
  },
  cropperload(e){
      console.log("cropper初始化完成");
  },
  loadimage(e){
      console.log("图片加载完成",e.detail);
      wx.hideLoading();
      //重置图片角度、缩放、位置
      this.cropper.imgReset();
  },
  clickcut(e) {
      console.log(e.detail);
      //点击裁剪框阅览图片
      // this.setData({
      //   src:e.detail.url,
      // })
      wx.previewImage({
          current: e.detail.url, // 当前显示图片的http链接
          urls: [e.detail.url] // 需要预览的图片http链接列表
      })
  },
})