// pages/home/home.js
var that= this;
var start_clientX;
var end_clientX;
const app = getApp()
const util = require("../../utils/util.js")
const db =  wx.cloud.database()
Page({
  data: {
    windowWidth: wx.getSystemInfoSync().windowWidth,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    data: [],

    windowHeight: 0,
  },
  // 滑动开始
  touchstart: function (e) {
    start_clientX = e.changedTouches[0].clientX
  },
  // 滑动结束
  touchend: function (e) {
    end_clientX = e.changedTouches[0].clientX;
    if (end_clientX - start_clientX > 120) {
      this.setData({
        display: "block",
        translate: 'transform: translateX(' + this.data.windowWidth * 0.7 + 'px);'
      })
    } else if (start_clientX - end_clientX > 0) {
      this.setData({
        display: "none",
        translate: ''
      })
    }
  },
  // 头像
  showview: function () {
    this.setData({
      display: "block",
      translate: 'transform: translateX(' + this.data.windowWidth * 0.7 + 'px);'
    })
  },
  // 遮拦
  hideview: function () {
    this.setData({
      display: "none",
      translate: '',
    })
  },


   onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  onShow:function(){
    var that = this
    db.collection('todos').get({
      success(res) {
        console.log(res.data)//下次删除
        that.setData({
          data: res.data,
        })
      }
    })    
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  addpage: function () {

    wx.navigateTo({
      url: "../add/add",
    })
  },
  drawStart: function (e) {
    // console.log("drawStart");  
    var touch = e.touches[0]

    for (var index in that.data.data) {
      var item = this.data.data[index]
      item.right = 0
    }
    this.setData({
      data: this.data.data,
      startX: touch.clientX,
    })

  },
  drawMove: function (e) {
    var index = e.target.dataset.index
    var touch = e.touches[0]
    var item = this.data.data[index]
    var disX = this.data.startX - touch.clientX
    //设置背景图片的透明度
    //console.log(disX)
    if (disX >= 0) {
      item.opacity_value = 1 - disX / 375
      item.right = disX
      this.setData({
        data: this.data.data
      })
    } else {
      item.right = 0
      item.opacity_value = 1
      this.setData({
        isScroll: true,
        data: this.data.data
      })
    }
  },
  drawEnd: function (e) {
    var that = this
    var index = e.target.dataset.index
    var list = this.data.data
    var item = this.data.data[e.currentTarget.dataset.index]
    var id = this.data.data[index]._id
    //disX大于某个距离时弹出框
    if (item.right >= 200) {
      item.opacity_value = 0
      wx.showModal({
        title: '提示',
        content: '确定删除此卡片',
        success: function (res) {
          if (res.confirm) {
            list.splice(index, 1)
            //删除云端数据
            db.collection('todos').doc(id).remove({
              success(res){
                console.log("删除成功")
              }
            })
            //更新本地列表
            that.setData({
              data: list
            });
          }
          else if (res.cancel) {
            item.right = 0
            item.opacity_value = 1
            that.setData({
              isScroll: true,
              data: that.data.data,
            })
          }
        }
      })
      this.setData({
        isScroll: true,
        data: this.data.data,
      })
    } else {
      item.right = 0
      item.opacity_value = 1
      this.setData({
        isScroll: true,
        data: this.data.data,
      })
    }
  }  
})
