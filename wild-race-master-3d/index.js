/**
 * 设置LayaNative屏幕方向，可设置以下值
 * landscape           横屏
 * portrait            竖屏
 * sensor_landscape    横屏(双方向)
 * sensor_portrait     竖屏(双方向)
 */
window.screenOrientation = "sensor_landscape";
// laya-library/laya.core.min.js")}
// ,function(e,t){e.exports=require(
// "laya-library/laya.d3.min.js")},function(e,t){
// e.exports=require("laya-library/laya.ui.min.js")},function(e,t){e.exports=require
// ("laya-library/laya.physics3D.min.js")
//-----libs-begin-----
loadLib("libs/min/laya.core.min.js")
loadLib("libs/min/laya.d3.min.js")
loadLib("libs/min/laya.ui.min.js")
loadLib("libs/min/laya.physics3D.min.js")

//-----libs-end-------
loadLib("js/main.js");
