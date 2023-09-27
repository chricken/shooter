'use strict';

import settings, { elements } from "../settings.js";
import helpers from '../helpers.js';

class Basic {
    constructor(posX, posY) {
        this.posX = posX;
        this.size = 2;
        this.cadence = 20;
        this.speed = 20;
        this.posY = posY + helpers.createNumber(-this.speed / 2, this.speed / 2); //(Math.random() * this.speed - this.speed / 2);
        this.minAngle = -10;
        this.maxAngle = 10;
        this.hitpower = 100;
        this.alive = true;

        // minAngle und maxAngle zum wirklichen Winkel umrechnen
        // Ab hier ist es Bogenmaß
        this.angle = ((Math.random() * (this.maxAngle - this.minAngle) + this.minAngle)) / 180 * Math.PI;
        // console.log(this.angle);

        this.update = this.update.bind(this);
        this.render = this.render.bind(this);
    }
    update() {
        // https://de.wikipedia.org/wiki/Trigonometrische_Funktion
        let moveX = Math.sin(this.angle) * this.speed;
        let moveY = -Math.cos(this.angle) * this.speed;
        this.posX += moveX;
        this.posY += moveY;
        this.render();

        // Hittest
        this.checkIfHit();

        if (this.posX < -this.size || this.posX < -elements.cProjectiles.width + this.size) this.alive = false;
        if (this.posY < -this.size || this.posY < -elements.cProjectiles.height + this.size) this.alive = false;
    }
    checkIfHit() {
        for (let i = 0; i < settings.enemies.length; i++) {
            let enemy = settings.enemies[i];
            let distance = helpers.distance(this, enemy);
            if(distance < enemy.hitDistance){
                this.alive = false;
                enemy.hit(this.hitpower);
            }
        }
        return false;
    }
    render() {
        let c = elements.cProjectiles;
        let ctx = elements.ctxProjectiles;
        ctx.fillStyle = '#f00';

        ctx.translate(this.posX, this.posY);
        ctx.rotate(this.angle);

        ctx.fillRect(
            0 - this.size / 2,
            0 - this.size / 2,
            this.size,
            this.size * 5
        )

        ctx.setTransform(1, 0, 0, 1, 0, 0);
    }
}

const Shoots = {
    Basic,
}

export default Shoots;