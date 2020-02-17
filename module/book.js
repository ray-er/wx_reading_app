import regeneratorRuntime from '../utils/runtime.js';
import {wxRequest} from '../utils/request'

const m_toBookDetail = (book_id)=>{
  wx.navigateTo('../views/book/bookContent/bookContent')
}

export default{
  m_toBookDetail
}