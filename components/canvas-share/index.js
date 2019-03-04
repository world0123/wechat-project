// 屏幕适配函数实现
function createRpx2px() {
  const { windowWidth } = wx.getSystemInfoSync()

  return function(rpx) {
    return windowWidth / 750 * rpx
  }
}

const rpx2px = createRpx2px()

// 海报保存临时路径
function canvasToTempFilePath(option, context) {
  return new Promise((resolve, reject) => {
    wx.canvasToTempFilePath({
      ...option,
      success: resolve,
      fail: reject,
    }, context)
  })
}

// 保存海报到本地
function saveImageToPhotosAlbum(option) {
  return new Promise((resolve, reject) => {
    wx.saveImageToPhotosAlbum({
      ...option,
      success: resolve,
      fail: reject,
    })
  })
}

Component({
  properties: {
    visible: {
      type: Boolean,
      value: false,
      observer(visible) {
        if (visible && !this.beginDraw) {
          this.draw()
          this.beginDraw = true
        }
      }
    },
    item: {
      type: Object,
      value: {}
    }
  },

  data: {
    beginDraw: false,
    isDraw: false,

    canvasWidth: 843,
    canvasHeight: 1500,

    imageFile: '',

    responsiveScale: 1,
  },

  lifetimes: {
    ready() {
      const designWidth = 375
      const designHeight = 603 // 这是在顶部位置定义，底部无tabbar情况下的设计稿高度

      // 以iphone6为设计稿，计算相应的缩放比例
      const { windowWidth, windowHeight } = wx.getSystemInfoSync()
      const responsiveScale =
        windowHeight / ((windowWidth / designWidth) * designHeight)
      if (responsiveScale < 1) {
        this.setData({
          responsiveScale,
        })
      }
    },
  },

  methods: {
    handleClose() {
      this.triggerEvent('close')
    },
    handleSave() {
      const { imageFile } = this.data

      if (imageFile) {
        saveImageToPhotosAlbum({
          filePath: imageFile,
        }).then(() => {
          wx.showToast({
            icon: 'none',
            title: '分享图片已保存至相册',
            duration: 2000,
          })
        })
      }
    },
    draw() {
      console.log('canvas data is: ', this.properties.item)
      wx.showLoading()
      const { canvasWidth, canvasHeight } = this.data
      // 创建绘图上下文
      const ctx = wx.createCanvasContext('share', this)
      
      // 屏幕适配
      const canvasW = rpx2px(canvasWidth * 2)
      const canvasH = rpx2px(canvasHeight * 2)
      
      ctx.save()
      // 绘制背景
      ctx.drawImage(
        '../../image/bg2.png',
        0,
        0,
        canvasW,
        canvasH
      )

      const beginY = rpx2px(260 * 2)
      const item = this.properties.item

      // 绘制title
      ctx.setTextAlign('center')
      ctx.setFontSize(80)
      ctx.setFillStyle('#ffffff')
      ctx.fillText(
        '过年',
        canvasW / 2,
        beginY,
      )
      ctx.stroke()

      // 绘制第二行内容---------------------------------
      // 设置距首行距离
      const YTwo = rpx2px(110 * 2)

      // 绘制日期
      ctx.setTextAlign('center')
      ctx.setFontSize(50)
      ctx.setFillStyle('#ffffff')
      ctx.fillText('2018年12月10日', canvasW / 2, beginY + YTwo)
      ctx.stroke()

      // 绘制第三行内容----------------------------------
      // 设置距首行距离
      const YThree = rpx2px(400 * 2)

      // 绘制倒计时数字
      const bold = rpx2px(4 * 2)
      ctx.setTextAlign('center')
      ctx.setFontSize(170)
      ctx.setFillStyle('#ffffff')
      ctx.fillText('25', canvasW / 2, beginY + YThree)
      // 文字偏移，使其加粗
      ctx.fillText('25', canvasW / 2 + bold, beginY + YThree + bold)
      ctx.fillText('25', canvasW / 2 - bold, beginY + YThree - bold)
      ctx.fillText('25', canvasW / 2 - bold, beginY + YThree + bold)
      ctx.fillText('25', canvasW / 2 + bold, beginY + YThree - bold)
      ctx.stroke()

      // 绘制倒计时文字
      // 后期动态改变距离
      ctx.setTextAlign('center')
      ctx.setFontSize(50)
      ctx.setFillStyle('#ffffff')
      ctx.fillText('已经', canvasW / 2 - rpx2px(160 * 2), beginY + YThree)
      ctx.fillText('天', canvasW / 2 + rpx2px(130 * 2), beginY + YThree)
      ctx.stroke()

      // 绘制第四行内容--------------------------
      // 设置距首行距离
      const YFour = rpx2px(620 * 2)
      ctx.setTextAlign('center')
      ctx.setFontSize(50)
      ctx.setFillStyle('#ffffff')
      ctx.fillText('已dfasdfdsaf 经', canvasW / 2, beginY + YFour)
      ctx.stroke()

      // 底部遮罩层
      const bottomHeight = rpx2px(150 * 2)
      ctx.setFillStyle('#ffffff')
      ctx.rect(0, canvasH - bottomHeight, canvasW, bottomHeight)
      ctx.setGlobalAlpha(0.2)

      // save , restore的使用，为了使下方描绘内容显示在遮罩层上
      ctx.restore()

      // 二维码和文字绘制
      ctx.setTextAlign('center')
      ctx.setFontSize(100)
      ctx.setFillStyle('#ffffff')
      ctx.fillText('扫码使用', canvasW / 2, canvasH - rpx2px(40 * 2))
      ctx.stroke()

      ctx.draw(false, () => {
        setTimeout(()=>{
          canvasToTempFilePath({
            canvasId: 'share',
          }, this).then(({ tempFilePath }) => this.setData({ imageFile: tempFilePath }))
        }, 100)
      })


      wx.hideLoading()
      this.setData({ isDraw: true })
    }
  }
})