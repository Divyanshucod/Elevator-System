"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const assests_1 = require("./assests");
const Lift_1 = require("./Lift");
const handleRequests_1 = require("./handleRequests");
let LiftObject;
const wss = new ws_1.WebSocket.Server({ port: assests_1.PORT });
let waitTimeUpdates = false;
wss.on('connection', (ws) => {
    console.log('socket connected');
    LiftObject = (0, Lift_1.createInstance)();
    if (waitTimeUpdates === false) {
        LiftObject.updateWaitTimeFirst();
        waitTimeUpdates = true;
    }
    (0, handleRequests_1.handleRequest)(ws, LiftObject);
    ws.on('close', () => {
        console.log('disconnected');
    });
});
