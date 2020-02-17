// components/UserItem/UserItem.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    hasLabel:{
      type:Boolean,
      value:false
    },
    _labelMsg:{
      type:String,
      value:''
    },
    _title:{
      type:String,
      value:''
    },
    _value:{
      type:String,
      value:''
    }
  },
  lifetimes(){
    attached:()=>{
      
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
    onClose(event) {
      const { position, instance } = event.detail;
      switch (position) {
        case 'left':
        case 'cell':
          instance.close();
          break;
        case 'right':
          Dialog.confirm({
            message: '确定删除吗？'
          }).then(() => {
            instance.close();
          });
          break;
      }
    }
  }
})
