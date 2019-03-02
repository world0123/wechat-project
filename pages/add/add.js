// pages/add/add.js
var util = require('../../utils/util.js')
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    text_name:'',
    upmost:false,
    date:'',
    shorttext:''
  },
  //响应选择日期
  bindDateChange: function (e) {
    //console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },

  subdata:function(e)
  {
    //console.log(text_name)
    this.checkUserName(e)
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
      wx.showLoading({
        title: '创建中',
        duration: 1000,
      })
      db.collection('todos').add({
        data:{
          title:text_name,
          date:this.data.date,
          content:shorttext,
          upmost:upmost,
          opacity_value:1,
          right:0
        },
        success:function(res){
          console(res.data)
        }
      })
      setTimeout(function(){
        wx.showToast({
          title: '创建成功',
          duration:500
        })
        setTimeout(function(){
          wx.navigateBack({
            detail: 1
          })
        },500)      
      },1000)
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var date = util.formatTime(new Date());
    console.log(Date)
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

  },
  checkUserName: function (param) {
    let { d, shorttext, text_name, upmost } = param.detail.value
    //var userid = util.regexConfig().cards; //姓名正则检验
    //var inputUserName = text_name.trim(); //输入信息确认
    var wellname = text_name.length; //字符长度确认
    console.log(text_name, wellname)
    if (wellname < 7) { //xxx.test是检测函数。
      return true;
    } else {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '姓名输入错误'
      });
      return false;
    }
  },
})