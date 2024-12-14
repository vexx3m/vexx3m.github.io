/**
 * 设置LayaNative屏幕方向，可设置以下值
 * landscape           横屏
 * portrait            竖屏
 * sensor_landscape    横屏(双方向)
 * sensor_portrait     竖屏(双方向)
 */
window.screenOrientation = "sensor_landscape";

//-----libs-begin-----
loadLib("https://h5gamessdk.yyggames.com/sdk/laya/2.13.1/laya.core.js")
loadLib("https://h5gamessdk.yyggames.com/sdk/laya/2.13.1/laya.ui.js")
loadLib("https://h5gamessdk.yyggames.com/sdk/laya/2.13.1/laya.d3.js")
loadLib("https://h5gamessdk.yyggames.com/sdk/laya/2.13.1/laya.cannonPhysics.js")
loadLib("https://h5gamessdk.yyggames.com/sdk/laya/2.13.1/laya.physics3D.js")
//-----libs-end-------
loadLib("js/main.js");
