function open_fullscreen() {
    let game = document.getElementById("game-area") || document.querySelector(".game-iframe") || document.querySelector("iframe");
    if (!game) return;

    let isFullscreen = document.fullscreenElement || 
                       document.webkitFullscreenElement || 
                       document.mozFullScreenElement || 
                       document.msFullscreenElement;

    if (!isFullscreen) {
        let requestMethod = game.requestFullscreen || 
                            game.webkitRequestFullscreen || 
                            game.mozRequestFullScreen || 
                            game.msRequestFullscreen;
        if (requestMethod) {
            let res = requestMethod.call(game);
            if (res && res.catch) {
                res.catch(function () {
                    // Fallback to container if iframe direct fullscreen is restricted
                    let container = game.closest('.game-iframe-container') || game.parentElement;
                    if (container) {
                        let containerReq = container.requestFullscreen || 
                                           container.webkitRequestFullscreen || 
                                           container.mozRequestFullScreen || 
                                           container.msRequestFullscreen;
                        if (containerReq) {
                            containerReq.call(container);
                        }
                    }
                });
            }
        } else {
            let container = game.closest('.game-iframe-container') || game.parentElement;
            if (container) {
                let containerReq = container.requestFullscreen || 
                                   container.webkitRequestFullscreen || 
                                   container.mozRequestFullScreen || 
                                   container.msRequestFullscreen;
                if (containerReq) {
                    containerReq.call(container);
                }
            }
        }
    } else {
        let exitMethod = document.exitFullscreen || 
                         document.webkitExitFullscreen || 
                         document.mozCancelFullScreen || 
                         document.msExitFullscreen;
        if (exitMethod) {
            exitMethod.call(document);
        }
    }
}