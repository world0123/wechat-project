// pages/add/add.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    text_name:'',
    upmost:false,
    d:'2019-02-22',
    shorttext:''
  },
  //响应选择日期
  bindDateChange: function (e) {
    //console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      d: e.detail.value
    })
  },

  subdata:function(e)
  {
    let {d,shorttext,text_name,upmost} = e.detail.value
    if(!text_name){
      wx.showModal({
        title: '提示',
        content: '名称不能为空',
        showCancel:false,  
      })
    }
    else{
      console.log("提交数据:", e.detail.value)
      wx.navigateBack({
        detail:1
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})