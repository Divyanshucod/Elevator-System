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
exports.handleRequest = void 0;
function handleRequest(socket, LiftObject) {
    socket.on("message", (data) => __awaiter(this, void 0, void 0, function* () {
        console.log("data", data);
        const message = JSON.parse(data.toString());
        console.log("message", message);
        if (message.type === "user" && message.algo === "fcfs") {
            LiftObject.addFloorRequests(message.payload.value);
            if (LiftObject.getStatus() !== "running") {
                console.log("fcfs call");
                yield LiftObject.FCFS(socket);
            }
        }
        else if (message.type === "user" && message.algo === "c_scan") {
            let curr = LiftObject.getCurrPos();
            if (message.payload.value >= curr) {
                LiftObject.insertMinHeap(message.payload.value);
            }
            else {
                {
                    LiftObject.insertMaxHeap(message.payload.value);
                }
            }
            if (LiftObject.getStatus() !== "running") {
                console.log("c_scan call");
                yield LiftObject.C_SCAN(socket);
            }
        }
    }));
}
exports.handleRequest = handleRequest;
