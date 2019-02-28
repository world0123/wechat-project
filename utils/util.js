const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime
}
function regexCongfig(){
  var reg = {
    
   // cards: /^[\u4e00-\u9fa5]{1,4}$/  姓名汉字正则验证
  }
  return reg;
}
module.exports = {
  formatTime:formatTime,
  regexConfig:regexCongfig
}