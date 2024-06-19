"use strict";
function mixin(...bases) {
    class Mix extends bases[0] {
        constructor(...args) {
            super(...args);
            bases.slice(1).forEach(base => {
                copyProperties(this, new base(...args));
            });
        }
    }
    for (let base of bases) {
        copyProperties(Mix, base);
        copyProperties(Mix.prototype, base.prototype);
    }
    return Mix;
}
function copyProperties(target, source) {
    for (let key of Reflect.ownKeys(source)) {
        if (key !== "constructor" && key !== "prototype" && key !== "name") {
            let desc = Object.getOwnPropertyDescriptor(source, key);
            if (desc) {
                Object.defineProperty(target, key, desc);
            }
        }
    }
}
