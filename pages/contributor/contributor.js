// pages/contributor/contributor.js
Page({
  data: {
    contributors: [
      {
        name: 'IWTF',
        avatarUrl: '../../image/iwtf.png',
        disc: '学生，对编程有极大兴趣，对新技术有充满好奇',
        github: 'https://github.com/IWTF',
        qq: '2872503148'
      },
      {
        name: 'world0123',
        avatarUrl: '../../image/world0123.png',
        disc: '说点什么呗',
        github: 'https://github.com/world0123',
        qq: '1610386428'
      },
      {
        name: 'liwhels',
        avatarUrl: '../../image/liwhels.png',
        disc: '说点什么呗',
        github: 'https://github.com/liwhels',
        qq: '870169293'
      }
    ],
    currentItemId: '1',
    showTimeLine: true,
    showAnimation: false,
    dots: [],
    tempDots: [
      {
        avatarUrl: '../../image/iwtf.png',
        time: '2019-2-12',
        detail: 'ddddddddddddddddssdddddd'
      },
      {
        avatarUrl: '../../image/liwhels.png',
        time: '2019-2-11',
        detail: 'daaaaaaaaaaaaaaaadddd'
      },
      {
        avatarUrl: '../../image/world0123.png',
        time: '2019-2-10',
        detail: 'dbbbbbbbbbbd'
      }
    ]
  },

  onLoad () {
    this.setData({ dots: this.data.tempDots })
  },

  // 复制链接函数
  copy (e) {
    // console.log('__contributor__ copy e: ', e)
    var id = e.currentTarget.dataset.id

    // 根据传参，获取复制，展示数据
    var data = String
    var Toast = String
    if (e.currentTarget.dataset.type == 'QQ') {
      data = this.data.contributors[id].qq
      Toast = 'QQ号已复制'
    } else {
      if (e.currentTarget.dataset.type == 'Github') {
        data = this.data.contributors[id].github
        Toast = 'Github链接已复制'
      } else {
        data = 'https://github.com/world0123/wechat-project'
        Toast = '项目地址已复制'
      }
    }

    // 设置粘贴板内容
    wx.setClipboardData({
      data: data, 
      success(res) {
        // 获取粘贴板内容
        wx.getClipboardData({
          success(res) {
            wx,wx.showToast({
              title: Toast
            })
          }
        })
      }
    })
  },

  // swiper改变触发函数
  swiperChange: function (e) {
    // console.log('__contributor__ swiperChange e: ', e)
    var currentItemId = e.detail.currentItemId;
    this.setData({
      currentItemId: currentItemId
    })
  },

  // 控制timeline展示状态函数
  showTimeLine () {
    this.setData({
      showAnimation: true,
      showTimeLine: !this.data.showTimeLine,
      dots: this.data.tempDots
    })
    if (this.data.showTimeLine) {
      this.setData({ dots: this.data.tempDots})
    } else {
      this.setData({ dots: [] })
    }
  }
})