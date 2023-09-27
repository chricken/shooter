'use strict';

import settings, { elements } from '../settings.js';
import Shoots from './shoots.js';

class Player {
    constructor(posX, posY) {
        this.posX = posX;
        this.posY = posY;
        this.size = 10;
        this.drag = 3;
        this.shooting = false;
        this.cadence = 10;     // Schusswiederholung in ms
        this.hitDistance = 100;

        this.shots = [];

        // binding
        this.shoot = this.shoot.bind(this);
    }
    update() {
        this.posX -= (this.posX - settings.posX) / this.drag;
        this.posY -= (this.posY - settings.posY) / this.drag;
        this.render();
    }
    render() {
        // Player rendern
        elements.ctxFg.fillStyle = '#fff';
        elements.ctxFg.fillRect(
            this.posX,
            this.posY,
            this.size,
            this.size
        )

        // Projektile müssen in einem eigenen Timing gerendert werden, daher ist der Update on der shoot-methode
        // elements.ctxProjectiles.clearRect(0, 0, elements.cProjectiles.width, elements.cProjectiles.height);
        for (let i = 0; i < this.shots.length; i++) {
            this.shots[i].update();
        }
        
        // Tote Projektile ausfiltern
        this.shots = this.shots.filter(shot => shot.alive);
    }
    shoot() {
        if (this.shooting) {
            let newShot = new Shoots.Basic(this.posX, this.posY);
            this.shots.push(newShot);
            this.cadence = newShot.cadence;
            setTimeout(this.shoot, this.cadence);
        }
    }
}

export default Player;