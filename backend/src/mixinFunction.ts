type Constructor<T = {}> = new (...args: any[]) => T;

function mixin<TBase extends Constructor>(...bases: TBase[]): TBase {
    class Mix extends bases[0] {
        constructor(...args: any[]) {
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

function copyProperties(target: any, source: any): void {
    for (let key of Reflect.ownKeys(source)) {
        if (key !== "constructor" && key !== "prototype" && key !== "name") {
            let desc = Object.getOwnPropertyDescriptor(source, key);
            if (desc) {
                Object.defineProperty(target, key, desc);
            }
        }
    }
}

