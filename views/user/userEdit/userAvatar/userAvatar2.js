// views/user/userEdit/userAvatar/userAvatar.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    width:0,
    height:0,
    olddistance:0,//上一次两个手指的距离
    newdistance:"",//本次两手指之间的距离，两个一减咱们就知道了滑动了多少，以及放大还是缩小（正负嘛
    diffdistance:'', //这个是新的比例，新的比例一定是建立在旧的比例上面的，给人一种连续的假象  
    Scale: 1,//图片放大的比例，
    baseHeight:'',       //原始高  
    baseWidth:'',        //原始宽  
  },
  chooseImage(){
    var _ = this;
    wx.chooseImage({
      count: 1, 
      sizeType: ['original'], 
      success: function (res) {
        _.setData({
          avatarUrl:res.tempFilePaths[0]
        })
        wx.getImageInfo({
          src: res.tempFilePaths[0],
          success: function (res) {
            //console.log(res.width);
            //console.log(res.height);
            var scale = res.width / res.height;
            if(scale > 1){//横版图片
              _.setData({
                height : 400,
                width:scale * 400
              })
            }else{//竖版图片
              _.setData({
                height :scale * 400,
                width:400
              })
            }
          }
        })
      }
    })
  },
  scroll:function (e) {
    var _this = this;
    //当e.touches.length等于1的时候，表示是单指触摸，我们要的是双指
    if (e.touches.length == 2) {//两个手指滑动的时候
      var xMove = e.touches[1].clientX - e.touches[0].clientX;//手指在x轴移动距离
      var yMove = e.touches[1].clientY - e.touches[0].clientY;//手指在y轴移动距离
      var distance = Math.sqrt(xMove * xMove + yMove * yMove);//根据勾股定理算出两手指之间的距离  
      if (_this.data.olddistance == 0) {
        _this.data.olddistance = distance; //要是第一次就给他弄上值，什么都不操作  
       // console.log("第一次");
      }else {
        _this.data.newdistance = distance; //第二次就可以计算它们的差值了  
        _this.data.diffdistance = _this.data.newdistance - _this.data.olddistance;//两次差值
        _this.data.olddistance = _this.data.newdistance; //计算之后更新比例  
        _this.data.Scale = _this.data.oldscaleA + 0.005 * _this.data.diffdistance;//这条公式是我查阅资料后找到的，按照这条公式计算出来的比例来处理图片，能给用户比较好的体验
        if (_this.data.Scale > 2.5){//放大的最大倍数
          return;
        } else if (_this.data.Scale < 1) {//缩小不能小于当前
          return;
        }
        //刷新.wxml ，每次相乘，都是乘以图片的显示宽高
        _this.setData({
          height: _this.data.baseHeight * _this.data.Scale,
          width: _this.data.baseWidth * _this.data.Scale
        })
        _this.data.oldscaleA = _this.data.Scale;//更新比例 


      }  
    }
  },
  //手指离开屏幕
  endTou: function (e) {
   this.data.olddistance = 0;//重置
   this.getRect();
  },
  getRect: function () {
    var _this = this;
    wx.createSelectorQuery().select('.FilePath').boundingClientRect(function (rect) {
              _this.data.x = Math.abs(rect.left);//x坐标
              _this.data.y = Math.abs(rect.top);//y坐标
              }).exec()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let avatarUrl = options.avatarUrl?options.avatarUrl:'https://img.yzcdn.cn/vant/cat.jpeg'
    this.setData({
      avatarUrl:avatarUrl,
      width:400,
      height:400
    })
    this.chooseImage();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

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