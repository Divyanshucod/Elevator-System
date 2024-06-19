import { WebSocket } from "ws";
import { Lift } from "./Lift";

export function handleRequest(socket: WebSocket, LiftObject: Lift): void {
  socket.on("message", async (data) => {
    console.log("data", data);

    const message = JSON.parse(data.toString());
    console.log("message", message);

    if (message.type === "user" && message.algo === "fcfs") {
      LiftObject.addFloorRequests(message.payload.value);
      if (LiftObject.getStatus() !== "running") {
        console.log("fcfs call");

        await LiftObject.FCFS(socket);
      }
    } else if (message.type === "user" && message.algo === "c_scan") {
      let curr = LiftObject.getCurrPos();
      if (message.payload.value >= curr) {
        LiftObject.insertMinHeap(message.payload.value);
      } else {
        {
          LiftObject.insertMaxHeap(message.payload.value);
        }
      }
      if (LiftObject.getStatus() !== "running") {
        console.log("c_scan call");

        await LiftObject.C_SCAN(socket);
      }
    }
  });
}
