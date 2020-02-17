//index.js
//获取应用实例
import {wxRequest} from '../../utils/request';
import regeneratorRuntime, { async } from '../../utils/runtime.js';
const app = getApp()

Page({
  data: {
    books:[1,2,3,4,5],
    swiperConfig:{
      indicatorAcitveColor:'#440e25'
    }
  },
  async getBooks(){
    let  res = await wxRequest('book/getBooks')
    return res.data
  },
  //事件处理函数
  onLoad:async function () {
    let books = await this.getBooks()
    console.log(books)
    this.setData({
      books:books
    })
  }
})
