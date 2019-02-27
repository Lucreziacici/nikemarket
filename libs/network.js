//获取open_id
var open_id;


//公共地址
var commonurl = "https://mall.shjinjia.com.cn/api/";
// var commonurl = "https://mall.comeyang.com/api/";
//测试
// var commonurl ="https://mallt.shjinjia.com.cn/api/";
//指向文慧地址
// var commonurl = "http://10.10.200.11/MiniProgramMall.Api/api/";

//店铺号
var shop_id = "1";

//不需要检测open_id的接口
var detectionport = [];
detectionport.push("Customer/GetOpenID");
detectionport.push("Category/BigCategoryList");
detectionport.push("Category/CategoryList");
detectionport.push("Brand/BrandList");
/**
 * url 请求地址
 * success 成功的回调
 * fail 失败的回调
 */


function GET(url, success, fail, openid) {


  var trueurl = url;
  if (url.indexOf("?") < 0) {
  } else {
    url = url.substring(0, url.indexOf("?"));
  }
  if (detectionport.indexOf(url) < 0) {
    wx.getStorage({
      key: 'open_id',
      success: function (res) {
        open_id = res.data
        wx.request({
          url: commonurl + trueurl,
          header: {
            'Content-Type': 'application/json',
            'open_id': open_id,
            'shop_id': shop_id
          },
          success: function (res) {
            console.log(res)
            success(res);
          },
          fail: function (res) {
            fail(res);
          }
        });
      },
      fail: (res) => {
        wx.request({
          url: commonurl + trueurl,
          header: {
            'Content-Type': 'application/json',
            'open_id': open_id,
            'shop_id': shop_id
          },
          success: function (res) {
            success(res);
          },
          fail: function (res) {
            fail(res);
          }
        });
      }
    })
  } else {
    wx.request({
      url: commonurl + trueurl,
      header: {
        'Content-Type': 'application/json',
        'shop_id': shop_id
      },
      success: function (res) {
        success(res);
      },
      fail: function (res) {
        fail(res);
      }
    });
  }
}

/**
 * url 请求地址
 * success 成功的回调
 * fail 失败的回调
 */
function POST(url, data, success, fail, openid) {
  console.log(openid)
  var trueurl = url;
  if (url.indexOf("?") < 0) {
  } else {
    url = url.substring(0, url.indexOf("?"));
  }
  if (detectionport.indexOf(url) < 0) {
    wx.getStorage({
      key: 'open_id',
      success: function (res) {
        open_id = res.data
        wx.request({
          url: commonurl + trueurl,
          header: {
            'content-type': 'application/x-www-form-urlencoded',
            'open_id': open_id,
            'shop_id': shop_id
          },
          method: 'POST',
          data: data,
          success: function (res) {
            success(res);
          },
          fail: function (res) {
            fail(res);
          }
        });
      },
      fail: (res) => {
        wx.request({
          url: commonurl + trueurl,
          header: {
            'content-type': 'application/x-www-form-urlencoded',
            'open_id': open_id,
            'shop_id': shop_id
          },
          method: 'POST',
          data: data,
          success: function (res) {
            success(res);
          },
          fail: function (res) {
            fail(res);
          }
        });
      }
    })
  } else {
    console.log("不需要open_id");
    wx.request({
      url: commonurl + trueurl,
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'shop_id': shop_id
      },
      method: 'POST',
      data: data,
      success: function (res) {
        success(res);
      },
      fail: function (res) {
        fail(res);
      }
    });
  }

}

/**
* url 请求地址
* success 成功的回调
* fail 失败的回调
*/
function GETJSON(url, data, success, fail, openid) {
  console.log(open_id)
  var trueurl = url;
  if (url.indexOf("?") < 0) {
  } else {
    url = url.substring(0, url.indexOf("?"));
  }
  if (detectionport.indexOf(url) < 0) {

    wx.getStorage({
      key: 'open_id',
      success: function (res) {
        open_id = res.data
        wx.request({
          url: commonurl + trueurl,
          header: {
            'Content-Type': 'application/json',
            'open_id': open_id,
            'shop_id': shop_id
          },
          data: data,
          success: function (res) {
            success(res);
          },
          fail: function (res) {
            fail(res);
          }
        });
      },
      fail: (res) => {
        wx.request({
          url: commonurl + trueurl,
          header: {
            'Content-Type': 'application/json',
            'open_id': open_id,
            'shop_id': shop_id
          },
          data: data,
          success: function (res) {
            success(res);
          },
          fail: function (res) {
            fail(res);
          }
        });
      }
    })
  } else {
    console.log("不需要open_id");
    wx.request({
      url: commonurl + trueurl,
      header: {
        'Content-Type': 'application/json',
        'shop_id': shop_id
      },
      data: data,
      success: function (res) {
        success(res);
      },
      fail: function (res) {
        fail(res);
      }
    });
  }

}

function IsuserInfo(success, fail) {
  wx.getStorage({
    key: 'userinfo_time',
    success: (res) => {
      var timestamp = Date.parse(new Date());
      if (res.data) {
        if (res.data < timestamp) {
          wx.removeStorage({
            key: 'userinfo',
            success: function (res) {
              wx.navigateTo({
                url: '../accredit/accredit'
              })
            }
          })
        } else {
          wx.getStorage({
            key: 'userinfo',
            success: function (res) {
              console.log(res)
              if (res.data.nick_name == null) {
                wx.navigateTo({
                  url: '../accredit/accredit'
                })
              }
            },
            fail: function (res) {
              console.log(res);
              wx.navigateTo({
                url: '../accredit/accredit'
              })
            }
          })

        }

      }
    },
    fail: function (res) {
      wx.getStorage({
        key: 'userinfo',
        success: function (res) {
          if (res.data.nick_name == null) {
            wx.navigateTo({
              url: '../accredit/accredit'
            })
          }
        },
        fail: function (res) {
          console.log(res);

          wx.navigateTo({
            url: '../accredit/accredit'
          })
        }
      })
    }
  })

}

function PostFormId(e) {
  if (e =='the formId is a mock one')return false
  wx.getStorage({
    key: 'open_id',
    success: (res) => {
      open_id = res.data
      wx.request({
        url: commonurl + 'Template/CollectFormID',
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          'open_id': open_id,
          'shop_id': shop_id
        },
        method: 'POST',
        data: { form_id: e },
        success: function (res) {
          console.log(res)
        },
        fail: function (res) {
          console.log(res)
        }
      });
    },
    fail: (res) => {
      wx.request({
        url: commonurl + 'Template/CollectFormID',
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          'open_id': open_id,
          'shop_id': shop_id
        },
        method: 'POST',
        data: { form_id: e },
        success: function (res) {
          console.log(res)
        },
        fail: function (res) {
          console.log(res)
        }
      });
    }
  })
}

function throttle(fn, gapTime) {
  if (gapTime == null || gapTime == undefined) {
    gapTime = 1500
  }

  let _lastTime = null

  // 返回新的函数
  return function () {
    let _nowTime = + new Date()
    if (_nowTime - _lastTime > gapTime || !_lastTime) {
      fn.apply(this, arguments)   //将this和参数传给原函数
      _lastTime = _nowTime
    }
  }
}
function getFormatDate(timestamp) {
  var newDate = new Date(timestamp);
  Date.prototype.format = function (format) {
    var date = {
      'M+': this.getMonth() + 1,
      'd+': this.getDate(),
      'h+': this.getHours(),
      'm+': this.getMinutes(),
      's+': this.getSeconds(),
      'q+': Math.floor((this.getMonth() + 3) / 3),
      'S+': this.getMilliseconds()
    };
    if (/(y+)/i.test(format)) {
      format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (var k in date) {
      if (new RegExp('(' + k + ')').test(format)) {
        format = format.replace(RegExp.$1, RegExp.$1.length == 1
          ? date[k] : ('00' + date[k]).substr(('' + date[k]).length));
      }
    }
    return format;
  }
  return newDate.format('yyyy-MM-dd');
}
module.exports = {
  GET: GET,
  POST: POST,
  GETJSON: GETJSON,
  IsuserInfo: IsuserInfo,
  throttle: throttle,
  PostFormId: PostFormId,
  getFormatDate: getFormatDate
}