'use strict';

import settings, { elements, x, y } from './settings.js';
import handlers from './handlers.js';
import helpers from './helpers.js';
import Player from './classes/player.js';
import Enemy1 from './classes/enemy1.js';

// KONSTANTEN / VARIABLEN
// let player, enemies = [];

// FUNKTIONEN
const domMapping = () => {
    elements.cBg = document.querySelector('canvas#bg')
    elements.ctxBg = elements.cBg.getContext('2d');

    elements.cFg = document.querySelector('canvas#fg')
    elements.ctxFg = elements.cFg.getContext('2d');

    elements.cProjectiles = document.querySelector('canvas#projectiles')
    elements.ctxProjectiles = elements.cProjectiles.getContext('2d');

    elements.cUI = document.querySelector('canvas#ui')
    elements.ctxUI = elements.cUI.getContext('2d');

    elements.spielfelder = [
        elements.cBg,
        elements.cFg,
        elements.cProjectiles,
        elements.cUI
    ]
}


const appendEventListeners = () => {
    window.addEventListener('resize', handlers.resize);
    elements.cUI.addEventListener('mousemove', handlers.mouseMove);
    elements.cUI.addEventListener('mousedown', () => handlers.mouseDown(settings.player));
    elements.cUI.addEventListener('mouseup', () => handlers.mouseUp(settings.player));
    elements.cUI.addEventListener('mouseleave', () => handlers.mouseUp(settings.player));
}

const render = () => {
    elements.ctxFg.clearRect(0, 0, elements.cFg.width, elements.cFg.height);
    elements.ctxProjectiles.clearRect(0, 0, elements.cProjectiles.width, elements.cProjectiles.height);

    // Spielelemente aktualisieren
    settings.player.update();
    settings.enemies.forEach(enemy => enemy.update());

    // Gestorbene Feinde ausfiltern
    settings.enemies = settings.enemies.filter(shot => shot.alive);

    requestAnimationFrame(render);
}

const init = () => {
    domMapping();
    appendEventListeners();
    handlers.resize();

    settings.player = new Player(elements.cUI.width / 2, elements.cUI.height / 2);

    // Testweise Gegner einfügen
    for (let i = 0; i < 30; i++) {
        settings.enemies.push(new Enemy1(
            helpers.createNumber(0, elements.cUI.width),
            helpers.createNumber(0, elements.cUI.height/3),
            helpers.createNumber(-30, 30),
            -30
        ));

    }

    requestAnimationFrame(render);
}

// INIT
init();