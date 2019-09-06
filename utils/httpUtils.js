const base_url = "https://www.wanandroid.com"

const http = ({
  url = '',
  params = {},
  ...other
} = {}) => {
  wx.showLoading({
    title: '努力请求中~'
  });
  return new Promise((resolve, reject) => {
    wx.request({
      url: getUrl(url),
      data: params,
      header: {
        'content-type': 'application/json' // 默认值 ,另一种是 "content-type": "application/x-www-form-urlencoded"
      },
      complete: (res) => {
        wx.hideLoading()
        if (res.statusCode == 200) {
          var data = res.data.data;
          var errCode = res.data.errorCode;
          var errMsg = res.data.errorMsg;
          console.log("data is "+data)
          console.log("errCode is "+errCode)
          console.log("errMsg is"+errMsg)
          if (errCode == 0) {
            resolve(data)
          } else {
            reject(errMsg)
          }
        } else {
          console.log("错误了")
          wx.showToast({
            title:"网络不给力",
            icon:"none"
          })
        }
      }
    })



  })
}

const getUrl = (url) => {
  if (url.indexOf('://') == -1) {
    url = base_url + url;
  }
  return url
}

// get方法
const _get = (url, param = {}) => {
  return http({
    url,
    param
  })
}

const _post = (url, param = {}) => {
  return http({
    url,
    param,
    method: 'post'
  })
}

const _put = (url, param = {}) => {
  return http({
    url,
    param,
    method: 'put'
  })
}

const _delete = (url, param = {}) => {
  return http({
    url,
    param,
    method: 'put'
  })
}
module.exports = {
  base_url,
  get: _get,
  _post,
  _put,
  _delete
}