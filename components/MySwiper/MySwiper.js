// components/MySwiper/MySwiper.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    _swiperConfig:{
      type:Object,
      value:{}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    swiperConfig:{
        indicatorDots:true,
        indicatorColor:'#f4f4f4',
        indicatorAcitveColor:'#139eeb',
        autoplay:true,
        interval:2000,
        circular:true,
        imgList: [ 'https://goss.veer.com/creative/vcg/veer/800water/veer-133504174.jpg',
        'https://goss.veer.com/creative/vcg/veer/800water/veer-144449457.jpg',
        'https://goss.veer.com/creative/vcg/veer/800water/veer-145570108.jpg']
    }
  },
  lifetimes:{
    attached(){
     this.initData()
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
     // 把父组件传过来的值_swiperConfig，更新给 swiperConfig
    initData(){
      let swiperConfig = this.data.swiperConfig
      let _swiperConfig = this.data._swiperConfig
      let _swiperConfigKeys = (Object.keys(_swiperConfig));
      for(let key in swiperConfig){
        let index = _swiperConfigKeys.indexOf(key);
        (index>-1)&&(swiperConfig[_swiperConfigKeys[index]] = _swiperConfig[_swiperConfigKeys[index]])
      }
      this.setData({
        swiperConfig:swiperConfig
      })
    }
  }
})
