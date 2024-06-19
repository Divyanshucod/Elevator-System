"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Operations = void 0;
const minHeap_1 = __importDefault(require("./minHeap"));
const maxHeap_1 = __importDefault(require("./maxHeap"));
class Operations {
    constructor() {
        this.floorRequests = [];
        this.currPos = 0;
        this.direction = "up";
        this.waitTimes = [];
        this.status = "stop";
        this.RestrictFloor = -1;
        this.minHeap = minHeap_1.default.getInstance();
        this.maxHeap = maxHeap_1.default.getInstance();
    }
    getFloorRequests() {
        return this.floorRequests.length > 0 ? this.floorRequests[0] : 0;
    }
    getCurrPos() {
        return this.currPos;
    }
    getDirection() {
        return this.direction;
    }
    getNoOfFloors() {
        return 5; // Assuming 5 floors, you can adjust this as needed
    }
    checkEmpty() {
        return this.floorRequests.length === 0;
    }
    getWaitTimes() {
        return this.waitTimes;
    }
    getStatus() {
        return this.status;
    }
    extractMinHeap() {
        return this.minHeap.extractMin();
    }
    extractMaxHeap() {
        return this.maxHeap.extractMax();
    }
}
exports.Operations = Operations;
