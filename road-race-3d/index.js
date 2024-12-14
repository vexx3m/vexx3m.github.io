/**
 * 设置LayaNative屏幕方向，可设置以下值
 * landscape           横屏
 * portrait            竖屏
 * sensor_landscape    横屏(双方向)
 * sensor_portrait     竖屏(双方向)
 */
window.screenOrientation = "sensor_landscape";

//-----libs-begin-----
//https://h5gamessdk.yyggames.com/sdk/laya/2.13.3
// loadLib("https://h5gamessdk.yyggames.com/sdk/laya/2.13.3/laya.core.js")
// loadLib("https://h5gamessdk.yyggames.com/sdk/laya/2.13.3/laya.ui.js")
// loadLib("https://h5gamessdk.yyggames.com/sdk/laya/2.13.3/laya.physics.js")

loadLib("libs/laya.core.min.js")
loadLib("libs/laya.ani.min.js")
loadLib("libs/laya.ui.min.js")
loadLib("libs/laya.d3.min.js")
loadLib("libs/jc.box.min.js")
loadLib("libs/laya-zip.min.js")
loadLib("libs/laya.physics3D.min.js")

//-----libs-end-------
loadLib("js/main.js");
