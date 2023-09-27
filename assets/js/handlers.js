'use strict';

import settings, { elements } from './settings.js';

const handlers = {
    resize() {
        elements.spielfelder.forEach(spielfeld => {
            spielfeld.width = window.innerWidth;
            spielfeld.height = window.innerHeight;
        })
    },
    mouseMove(evt) {
        settings.posX = evt.layerX;
        settings.posY = evt.layerY;
    },
    mouseDown(player){
        console.log('down');
        player.shooting = true;
        player.shoot();
    },
    mouseUp(player){
        console.log('up');
        player.shooting = false;        
    }
}

export default handlers;    