// components/navigationBar/navigationBar.js
// 屏幕适配函数实现
function createRpx2px() {
  const { windowWidth } = wx.getSystemInfoSync()

  return function (rpx) {
    return windowWidth / 750 * rpx
  }
}

const rpx2px = createRpx2px()

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    type: {
      type: String,
      value: 'back'
    },
    showview: {
      type: Function,
      value: function () {
        console.log('fadfadfadf')
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    statusBarHeight: wx.getSystemInfoSync().statusBarHeight
  },

  /**
   * 组件的方法列表
   */
  methods: {
    navBack () {
      wx.navigateBack({
        delta: 1
      })
    }
  },

  lifetimes: {
    ready () {
      var t = wx.getMenuButtonBoundingClientRect().bottom
      var b = wx.getSystemInfoSync().statusBarHeight
      console.log('cupare top, bottom is ', t, b)
    }
  }
})
