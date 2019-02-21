//index.js
//获取应用实例
const app = getApp();
console.log(app.globalword);
Page({
  data:{
    text: 'init data',
    num: 0,
    array: [{ text: 'init data' }],
    object: {
      text: 'init data'
    }
  },
  onLoad(){
    console.log('page onload');
  },
  onReady(){
    console.log('page onready');

  },
 onShow(){
   console.log(this.route);
   console.log('page onshow');
 },
 onHide(){
   console.log('page onhide');
   
 },
  onShareAppMessage(res) {
    if (res.from === 'menu') {
      // 来自页面内转发按钮
      console.log('menu share')
    }
    return {
      title: '自定义转发标题',
      path: '/page/user?id=123'
    }
  },
  onTabItemTap(asd) {
    console.log(asd.index)
    console.log(asd.pagePath)
    console.log(asd.text)
  },
  tapName(event) {
    console.log(event)
  },
  changeText() {
    // this.data.text = 'changed data' // 不要直接修改 this.data
    // 应该使用 setData
    this.setData({
      text: 'changed data'
    })
  },
  changeNum() {
    // 或者，可以修改 this.data 之后马上用 setData 设置一下修改了的字段
    this.data.num = 1
    this.setData({
      num: this.data.num
    })
  },
  changeItemInArray() {
    // 对于对象或数组字段，可以直接修改一个其下的子字段，这样做通常比修改整个对象或数组更好
    this.setData({
      'array[0].text': 'changed data'
    })
  },
  changeItemInObject() {
    this.setData({
      'object.text': 'changed data'
    })
  },
  addNewField() {
    this.setData({
      'newField.text': 'new data'
    })
  }
})
