import MinHeap from './minHeap';
import MaxHeap from './maxHeap';

export class Operations {
  floorRequests: number[] = [];
  currPos: number = 0;
  direction: string = "up";
  waitTimes: number[] = [];
  status: string = "stop";
  RestrictFloor = -1;
  minHeap = MinHeap.getInstance();
  maxHeap = MaxHeap.getInstance();

  getFloorRequests(): number {
    return this.floorRequests.length > 0 ? this.floorRequests[0] : 0;
  }

  getCurrPos(): number {
    return this.currPos;
  }

  getDirection(): string {
    return this.direction;
  }

  getNoOfFloors(): number {
    return 5; // Assuming 5 floors, you can adjust this as needed
  }

  checkEmpty(): boolean {
    return this.floorRequests.length === 0;
  }

  getWaitTimes(): number[] {
    return this.waitTimes;
  }
  
  getStatus() {
    return this.status;
  }

  extractMinHeap(): number {
    return this.minHeap.extractMin();
  }

  extractMaxHeap(): number {
    return this.maxHeap.extractMax();
  }
}
