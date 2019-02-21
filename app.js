//app.js
App({
  onLaunch(options){
  	console.log(options);
  },
  onShow(word){
    console.log(word);	
  },
  onHide(){
  	console.log('onHide');
  },
  onError(msg){
    console.log('msg');
  },
  globalword:'hello world',
})