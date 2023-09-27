'use strict';

const helpers = {
    createNumber(min, max, dec = 0) {
        dec = 10 ** dec;
        let num = Math.random();
        num *= max - min + 1 / dec;
        num += min;

        num *= dec;
        num = Math.floor(num);
        num /= dec;
        return num;
    },
    distance(el1, el2) {
        let x = el1.posX - el2.posX;
        let y = el1.posY - el2.posY;
        return Math.sqrt(x * x + y * y);
    }
}

export default helpers;