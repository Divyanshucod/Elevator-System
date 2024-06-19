
import {WebSocket} from 'ws';
import { PORT } from './assests';
import { Lift, createInstance } from './Lift';
import {handleRequest} from './handleRequests';

let LiftObject:Lift; 
const wss = new WebSocket.Server({port:PORT});
let waitTimeUpdates = false;

wss.on('connection',(ws)=>{
    console.log('socket connected');
    LiftObject = createInstance();
    if(waitTimeUpdates === false){
        LiftObject.updateWaitTimeFirst();
        waitTimeUpdates = true;
    }
    handleRequest(ws,LiftObject);

    ws.on('close', ()=>{
        console.log('disconnected');
        
    })
})
