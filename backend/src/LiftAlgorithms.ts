
import { WebSocket } from "ws";
import { HandleUpdates } from "./HandleUpdates";

export class LiftAlgorithm extends HandleUpdates {
  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  public async FCFS(socket: WebSocket): Promise<void> {
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
      } else {
        this.updateDirection("up");
      }
      let diff = NoOfFloorsToMove;
      console.log({ cnt: cnt, diff: diff });

      while (diff !== 0) {
        diff -= cnt;
        currPosition += cnt;
        this.updateCurrPos(currPosition);
        await this.calculateWaitTime(); // Recalculate wait times
        console.log("below down i have socket");
        if (this.getStatus() === "stop") {
          this.updateStatus("running");
        }
        socket.send(
          JSON.stringify({
            type: "user",
            payload: {
              currentPos: this.getCurrPos(),
              waitTimes: this.getWaitTimes(),
            },
          })
        );
        await this.sleep(1000); // Wait for 1 second
      }
      this.updateStatus("stop");
    }
  }

  public async C_SCAN(socket: WebSocket): Promise<void> {
    // Implementation for C_SCAN algorithm

    while (
      this.minHeap.checkMinvalue() !== -1 ||
      this.maxHeap.checkMaxvalue() !== -1
    ) {
      console.log({maxHeapFirst :  this.maxHeap.checkMaxvalue(),minHeapFirst:this.minHeap.checkMinvalue()});
      
      let curr = this.getCurrPos();
      if (this.minHeap.checkMinvalue() !== -1) {
        while (this.getDirection() === "up" && curr != this.getNoOfFloors()) {
          this.updateCurrPos(curr);
          await this.calculateWaitTime();
          
          socket.send(
            JSON.stringify({
              type: "user",
              payload: {
                currentPos: this.getCurrPos(),
                waitTimes: this.getWaitTimes(),
              },
            })
          );
          if (curr === this.minHeap.checkMinvalue()) {
            this.extractMinHeap();
            await this.sleep(4000);
            await this.calculateWaitTime(4);
          }
          curr++;
          await this.sleep(1000);
        }
      }
      this.updateDirection("down");
      curr = this.getCurrPos();
      if (this.maxHeap.checkMaxvalue() !== -1) {
        while (this.getDirection() === "down" && curr >= 0) {
          this.updateCurrPos(curr);
          await this.calculateWaitTime();
          socket.send(
            JSON.stringify({
              type: "user",
              payload: {
                currentPos: this.getCurrPos(),
                waitTimes: this.getWaitTimes(),
              },
            })
          );
          if (curr === this.maxHeap.checkMaxvalue()) {
            this.extractMaxHeap();
            await this.sleep(4000);
            await this.calculateWaitTime(4);
          }
          curr--;
          await this.sleep(1000);
        }
      }
      this.updateDirection("up");
    }
  }

  public async calculateWaitTime(val:number = 0): Promise<void> {
    const waitTimes = this.getWaitTimes();
    const currentPos = this.getCurrPos();
    const numFloors = waitTimes.length;
    for (let i = 0; i < numFloors; i++) {
      waitTimes[i] = Math.abs(i - currentPos)+val;
    }

    this.updateWaitTime(waitTimes);
  }
  
}

// i am calculating waitTime  now i want to add more time when the lift wait to drop user but it is not working as expected.