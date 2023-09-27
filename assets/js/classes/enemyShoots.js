'use strict';

import settings, { elements } from "../settings.js";

const createNumber = (min, max) => ~~(Math.random() * (max - min + 1) + min);

class Basic {
    constructor(posX, posY) {
        this.posX = posX;
        this.size = 5;
        this.cadence = 5;
        this.speed = 20;
        this.posY = posY + (Math.random() * this.speed - this.speed / 2);
        this.minAngle = -20;
        this.maxAngle = 20;
        this.hp = 10;
        this.alive = true;

        // minAngle und maxAngle zum wirklichen Winkel umrechnen
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

        if (this.posX < -this.size || this.posX < -elements.cProjectiles.width + this.size) this.alive = false;
        if (this.posY < -this.size || this.posY < -elements.cProjectiles.height + this.size) this.alive = false;
    }
    render() {
        let c = elements.cProjectiles;
        let ctx = elements.ctxProjectiles;

        ctx.fillStyle = '#f00';
        ctx.fillRect(
            this.posX - this.size / 2,
            this.posY - this.size / 2,
            this.size,
            this.size
        )
    }
}

const Shoots = {
    Basic,
}

export default Shoots;