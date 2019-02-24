Page({
  data: {
    data: [{ t: "距离纪念日还有5天", c:'阿丽塔超级战士',d:'2019-02-23',right: 0, opacity_value: 1 },
      { t: "距离纪念日还有3天", c: '阿丽塔超级战士', d: '2019-02-23', right: 0, opacity_value: 1  },
      { t: "距离纪念日还有4天", c: '阿丽塔超级战士', d: '2019-02-23', right: 0, opacity_value: 1 },
      { t: "距离纪念日还有5天", c: '阿丽塔超级战士', d: '2019-02-23', right: 0, opacity_value: 1 },
      { t: "距离纪念日还有8天", c: '阿丽塔超级战士', d: '2019-02-23', right: 0, opacity_value: 1  }],
    isScroll: true,
    windowHeight: 0,
  },
  addpage: function () {

    wx.navigateTo({
      url: "../add/add",
    })
  },
  onLoad: function (options) {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          windowHeight: res.windowHeight
        });
      }
    });
  },
  drawStart: function (e) {
    // console.log("drawStart");  
    var touch = e.touches[0]

    for (var index in this.data.data) {
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
    console.log(disX)
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
    var index = e.target.dataset.index
    var list = this.data.data
    var item = this.data.data[e.currentTarget.dataset.index]
    //disX大于某个距离时弹出框
    if (item.right >= 200) {
      item.opacity_value = 0
      wx.showModal({
        title: '提示',
        content: '确定删除此卡片',
        success: function (res) {
          if (res.confirm) {
            list.splice(index, 1)
            this.setData({
              data: list
            });
          }
          else if (res.cancel) {
            item.right = 0
            item.opacity_value = 1
            this.setData({
              isScroll: true,
              data: this.data.data,
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
  },
})