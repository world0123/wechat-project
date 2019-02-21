//logs.js
const util = require('../../utils/util.js')

const common = require('common.js')
Page({
  helloMINA() {
    common.sayHello('MINA');
  },
  goodbyeMINA() {
    common.sayGoodbye('MINA')
  }
})