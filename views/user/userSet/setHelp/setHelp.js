// views/user/userSet/setHelp/setHelp.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    questions:[
      {
        content:"如何查找相要的书籍?",
        id:0
      },
      {
        content:"我去哪里修改个人信息呢?",
        id:1
      }
    ],
    stepsArray:[
      {
        answerTitle:'搜索内容',
        iconName:'search',
        bottomText:'快去搜索吧~~~',
        active:3,
        steps:[
          {
            text: '点击tab页首页',
            desc: '找到页面入口'
          },
          {
            text: '在搜索栏输入关键字',
            desc: '根据关键字查找目标书籍/故事'
          },
          {
            text: '点击搜索',
            desc: '跳转搜索结果界面'
          },
          {
            text: '查看结果',
            desc: '查看搜索到的具体内容'
          }
        ]
      },
      {
        answerTitle:'修改个人信息',
        iconName:'user-o',
        bottomText:'快去修改个人信息吧~~~',
        active:3,
        steps:[
          {
            text: '点击tab页个人中心',
            desc: '找到页面入口'
          },
          {
            text: '点击编辑信息',
            desc: '跳转编辑信息页面'
          },
          {
            text: '编辑信息',
            desc: '修改字段内容'
          },
          {
            text: '保存信息',
            desc: '更新个人信息'
          }
        ]
      }
    ],
    active: 0,
    show:false,
    bottomText:'',
    steps: [],
    iconName:'',
    answerTitle:''
  },
  showAnswer(e){
    let {id} = e.currentTarget.dataset;
    let {steps,active,bottomText,iconName,answerTitle} = this.data.stepsArray[parseInt(id)]
    this.setData({
      steps,
      active,
      iconName,
      answerTitle,
      bottomText,
      show:true
    })
    console.log(question)
  },
  hideAnswer(){
    this.setData({
      show:false
    })
  },
  onChange(event) {
    // event.detail 的值为当前选中项的索引
    this.setData({ active: event.detail });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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