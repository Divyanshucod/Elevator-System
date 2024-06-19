"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HandleUpdates = void 0;
const getOperations_1 = require("./getOperations");
class HandleUpdates extends getOperations_1.Operations {
    removeFloorRequests() {
        this.floorRequests.shift();
    }
    addFloorRequests(floor) {
        let len = this.floorRequests.length;
        if (this.floorRequests[len - 1] !== floor && this.RestrictFloor !== floor) {
            this.floorRequests.push(floor);
        }
    }
    updateCurrPos(pos) {
        this.currPos = pos;
    }
    updateDirection(dir) {
        this.direction = dir;
    }
    updateStatus(status) {
        this.status = status;
    }
    updateWaitTime(waitTimes) {
        this.waitTimes = waitTimes;
    }
    RestrictTheFloor(floor) {
        this.RestrictFloor = floor;
        return floor;
    }
    updateWaitTimeFirst(floors = 5) {
        console.log('update initial waitTime');
        for (let i = 0; i < floors; i++) {
            this.waitTimes[i] = i;
        }
        console.log('after updating waitTime:', this.waitTimes);
    }
    insertMaxHeap(value) {
        this.maxHeap.insert(value);
    }
    insertMinHeap(value) {
        this.minHeap.insert(value);
    }
}
exports.HandleUpdates = HandleUpdates;
