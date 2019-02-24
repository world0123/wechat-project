// pages/contributor/contributor.js
Page({
  data: {
    arr: [1,2,3],
    currentItemId: '1',
    showTimeLine: false
  },

  swiperChange: function (e) {
    // console.log('__contributor__ swiperChange e: ', e)
    var currentItemId = e.detail.currentItemId;
    this.setData({
      currentItemId: currentItemId
    })
  },

  showTimeLine () {
    this.setData({
      showTimeLine: !this.data.showTimeLine
    })
  }
})