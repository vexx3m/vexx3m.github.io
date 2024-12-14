
// Import any other script files here, e.g.:
// import * as myModule from "./mymodule.js";

runOnStartup(async runtime =>
{
	// Code to run on the loading screen.
	// Note layouts, objects etc. are not yet available.


    let style = document.createElement('style');
    style.textContent = "canvas { -webkit-tap-highlight-color: transparent; -webkit-touch-callout: none -webkit-user-select: none; -khtml-user-select: none; -moz-user-select: none; -ms-user-select: none user-select: none; }";
    document.head.appendChild(style);

console.log('%chttps://portfolio.sydergames.com/', 'font-size: 20px; background-color: white; color: white; font-weight:bold;')
	console.log('%cDeveloped by Syder Studio', 'font-size: 20px; background-color: red; color: white; font-weight:bold;');
	
	runtime.addEventListener("beforeprojectstart", () => OnBeforeProjectStart(runtime));
});

async function OnBeforeProjectStart(runtime)
{
	// Code to run just before 'On start of layout' on
	// the first layout. Loading has finished and initial
	// instances are created and available to use here.
	window.addEventListener('keydown', ev => {
    if (['ArrowDown', 'ArrowUp', ' '].includes(ev.key)) {
        ev.preventDefault();
    }
});
window.addEventListener('wheel', ev => ev.preventDefault(), { passive: false });

window.onfocus=function(ev){
runtime.globalVars.focus = 1;
}
window.onblur=function(ev){
runtime.globalVars.focus = 0;
}



	runtime.addEventListener("tick", () => Tick(runtime));
}

function Tick(runtime)
{
	// Code to run every tick
// 	window.addEventListener('keydown', ev => {
//     if (['ArrowDown', 'ArrowUp', ' '].includes(ev.key)) {
//         ev.preventDefault();
//     }
// });
// window.addEventListener('wheel', ev => ev.preventDefault(), { passive: false });

}
