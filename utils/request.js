import regeneratorRuntime from './runtime.js'

const baseUrl = 'http://127.0.0.1:3000/';

const wxRequest = async (api, params = {}) => {
  Object.assign(params, {
    token: wx.getStorageSync('token')
  })
  // 所有的请求，header默认携带token
  let header = params.header || {
    'Content-Type': 'application/json',
    'token': params.token || ''
  }
  let data = params.data || {}
  let method = params.method || 'GET'
  // hideLoading可以控制是否显示加载状态
  if (!params.hideLoading) {
   wx.showLoading({
     title: '加载中...'
   })
  }
  let res = await new Promise((resolve, reject) => {
    wx.request({
      url: baseUrl+api,
      method: method,
      data: data,
      header: header,
      success: (res) => {
        // console.log(res)
        if (res && res.statusCode == 200) {
          resolve(res.data)
        } else {
          reject(res)
        }
      },
      fail: (err) => {
        reject(err)
      },
      complete: (e) => {
        // 为了防止获取数据太快，设置延迟。
        if(!params.hideLoading){
          setTimeout(()=>{
            wx.hideLoading()
          },500)
        }
      }
    })
  })
  return res
}

export {
  wxRequest
}