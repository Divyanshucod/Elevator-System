"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createInstance = exports.Lift = void 0;
const LiftAlgorithms_1 = require("./LiftAlgorithms");
class Lift extends LiftAlgorithms_1.LiftAlgorithm {
    constructor(noOfFloors = 5) {
        super();
        this.noOfFloors = noOfFloors;
    }
}
exports.Lift = Lift;
function createInstance(noOfFloors = 5) {
    return new Lift(noOfFloors);
}
exports.createInstance = createInstance;
