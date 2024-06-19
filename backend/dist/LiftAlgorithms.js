"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LiftAlgorithm = void 0;
const HandleUpdates_1 = require("./HandleUpdates");
class LiftAlgorithm extends HandleUpdates_1.HandleUpdates {
    sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
    FCFS(socket) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("inside fcfs", this.floorRequests);
            while (!this.checkEmpty()) {
                let currPosition = this.getCurrPos();
                const NoOfFloorsToMove = this.getFloorRequests() - currPosition;
                console.log({
                    currentPos: currPosition,
                    NoOfFloorsToMove: NoOfFloorsToMove,
                });
                this.removeFloorRequests();
                const cnt = NoOfFloorsToMove < 0 ? -1 : 1;
                if (cnt === -1) {
                    this.updateDirection("down");
                }
                else {
                    this.updateDirection("up");
                }
                let diff = NoOfFloorsToMove;
                console.log({ cnt: cnt, diff: diff });
                while (diff !== 0) {
                    diff -= cnt;
                    currPosition += cnt;
                    this.updateCurrPos(currPosition);
                    yield this.calculateWaitTime(); // Recalculate wait times
                    console.log("below down i have socket");
                    if (this.getStatus() === "stop") {
                        this.updateStatus("running");
                    }
                    socket.send(JSON.stringify({
                        type: "user",
                        payload: {
                            currentPos: this.getCurrPos(),
                            waitTimes: this.getWaitTimes(),
                        },
                    }));
                    yield this.sleep(1000); // Wait for 1 second
                }
                this.updateStatus("stop");
            }
        });
    }
    C_SCAN(socket) {
        return __awaiter(this, void 0, void 0, function* () {
            // Implementation for C_SCAN algorithm
            while (this.minHeap.checkMinvalue() !== -1 ||
                this.maxHeap.checkMaxvalue() !== -1) {
                console.log({ maxHeapFirst: this.maxHeap.checkMaxvalue(), minHeapFirst: this.minHeap.checkMinvalue() });
                let curr = this.getCurrPos();
                if (this.minHeap.checkMinvalue() !== -1) {
                    while (this.getDirection() === "up" && curr != this.getNoOfFloors()) {
                        this.updateCurrPos(curr);
                        yield this.calculateWaitTime();
                        socket.send(JSON.stringify({
                            type: "user",
                            payload: {
                                currentPos: this.getCurrPos(),
                                waitTimes: this.getWaitTimes(),
                            },
                        }));
                        if (curr === this.minHeap.checkMinvalue()) {
                            this.extractMinHeap();
                            yield this.sleep(4000);
                            yield this.calculateWaitTime(4);
                        }
                        curr++;
                        yield this.sleep(1000);
                    }
                }
                this.updateDirection("down");
                curr = this.getCurrPos();
                if (this.maxHeap.checkMaxvalue() !== -1) {
                    while (this.getDirection() === "down" && curr >= 0) {
                        this.updateCurrPos(curr);
                        yield this.calculateWaitTime();
                        socket.send(JSON.stringify({
                            type: "user",
                            payload: {
                                currentPos: this.getCurrPos(),
                                waitTimes: this.getWaitTimes(),
                            },
                        }));
                        if (curr === this.maxHeap.checkMaxvalue()) {
                            this.extractMaxHeap();
                            yield this.sleep(4000);
                            yield this.calculateWaitTime(4);
                        }
                        curr--;
                        yield this.sleep(1000);
                    }
                }
                this.updateDirection("up");
            }
        });
    }
    calculateWaitTime() {
        return __awaiter(this, arguments, void 0, function* (val = 0) {
            const waitTimes = this.getWaitTimes();
            const currentPos = this.getCurrPos();
            const numFloors = waitTimes.length;
            for (let i = 0; i < numFloors; i++) {
                waitTimes[i] = Math.abs(i - currentPos) + val;
            }
            this.updateWaitTime(waitTimes);
        });
    }
}
exports.LiftAlgorithm = LiftAlgorithm;
// i am calculating waitTime  now i want to add more time when the lift wait to drop user but it is not working as expected.
