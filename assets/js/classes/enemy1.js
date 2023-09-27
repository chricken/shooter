'use strict';

import settings, { elements } from '../settings.js';
import Shoots from './enemyShoots.js';

class Enemy1 {
    constructor(posX, posY, angle) {
        this.posX = posX;
        this.posY = posY;
        this.angle = angle / 180 * Math.PI;
        this.speed = 2;
        this.size = 3;
        this.drag = 3;
        this.shooting = false;
        this.cadence = 300;     // Schusswiederholung in ms
        this.hitDistance = 30;
        this.hp = 30;
        this.alive = true;

        this.shots = [];

        // binding
        this.shoot = this.shoot.bind(this);
    }

    update() {
        let moveX = Math.sin(this.angle) * this.speed;
        let moveY = -Math.cos(this.angle) * this.speed;
        this.posX -= moveX;
        this.posY -= moveY;
        this.render();
    }

    render() {
        // Player rendern
        let ctx = elements.ctxFg;
        ctx.fillStyle = '#58f';

        ctx.translate(this.posX, this.posY);
        ctx.rotate(this.angle);

        ctx.fillRect(
            0,
            0,
            this.size,
            this.size * 5
        )

        ctx.setTransform(1, 0, 0, 1, 0, 0);

        // Projektile müssen in einem eigenen Timing gerendert werden, daher ist der Update on der shoot-methode
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
    hit(damage){
        this.hp -= damage;
        if(this.hp <= 0){
            this.die();
        }
    }
    die(){
        this.alive = false;
    }
}

export default Enemy1;