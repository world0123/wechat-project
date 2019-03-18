// pages/home/home.js
var start_clientX;
var end_clientX;
const app = getApp()
const util = require("../../utils/util.js")
const db = wx.cloud.database()
Page({
  data: {
    windowWidth: wx.getSystemInfoSync().windowWidth,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    data: [],
    windowHeight: 0,
    bgColor:'',
    display: 'none',
    statusBarHeight: wx.getSystemInfoSync().statusBarHeight
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
    var that = this
    db.collection('todos').get({
      success(res) {
        console.log(res.data)//下次删除
        app.data = res.data
        that.setData({
          data: res.data
        })
      }
    })
  },

  onShow: function () {
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
    var touch = e.touches[0]
    this.setData({
      data: this.data.data,
      startX: touch.clientX,
    })
  },

  drawMove: function (e) {
    if (e.target.id == "viewx") {
      var index = e.target.dataset.index
      var touch = e.touches[0]
      var item = this.data.data[index]
      var disX = this.data.startX - touch.clientX
      //console.log(e)
      //设置背景图片的透明度
      //console.log(disX)
      if (disX >= 0) {
        item.opacity_value = 1 - disX / 375
        item.right = disX
        this.setData({
          data: this.data.data
        })
      }else if(disX>300){
        item.right = 300
        this.setData({
          data:this.data.data
        })
      }
       else {
        item.right = 0
        item.opacity_value = 1
        this.setData({
          isScroll: true,
          data: this.data.data
        })
      }
    }
  },

  drawEnd: function (e) {
    if (e.target.id == "viewx") {
      var that = this
      var index = e.target.dataset.index
      var list = that.data.data
      var item = that.data.data[e.currentTarget.dataset.index]

      var id = that.data.data[index]._id
      //disX大于某个距离时弹出框
      if (item.right >= 100) {
        item.opacity_value = 0
        wx.showModal({
          title: '提示',
          content: '确定删除此卡片',
          success: function (res) {
            if (res.confirm) {
              list.splice(index, 1)
              //删除云端数据
              db.collection('todos').doc(id).remove({
                success(res) {
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
        that.setData({
          isScroll: true,
          data: that.data.data,
        })
      } else {
        item.right = 0
        item.opacity_value = 1
        that.setData({
          isScroll: true,
          data: that.data.data,
        })
      }
    }
  },
  GoHome: function () {
    wx.navigateTo({
      url: '../world0123/me',
    })
  },
  GoAdd: function () {
    wx.navigateTo({
      url: '../add/add',
    })
  },
  GoContributor: function () {
    wx.navigateTo({
      url: '../contributor/contributor',
    })
  },
})
