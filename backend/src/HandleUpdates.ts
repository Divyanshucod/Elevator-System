import { Operations } from "./getOperations";


export class HandleUpdates extends Operations {

  removeFloorRequests(): void {
    this.floorRequests.shift();
  }

  addFloorRequests(floor: number): void {
    let len = this.floorRequests.length;
    if(this.floorRequests[len-1] !== floor && this.RestrictFloor !== floor){
      this.floorRequests.push(floor);
    }
  }

  updateCurrPos(pos: number): void {

    this.currPos = pos;
  }

  updateDirection(dir: string): void {
    this.direction = dir;
  }

  updateStatus(status:string){
    this.status = status;
  }
  
  updateWaitTime(waitTimes: number[]): void {
    this.waitTimes = waitTimes;
  }
  
  RestrictTheFloor(floor:number): number{
    this.RestrictFloor = floor;
    return floor;
 }
  updateWaitTimeFirst(floors:number = 5){
    console.log('update initial waitTime');
    
    for(let i = 0;i<floors;i++){
      this.waitTimes[i] = i;
    }
    console.log('after updating waitTime:', this.waitTimes);
    
  }
  insertMaxHeap(value: number): void {
    this.maxHeap.insert(value);
  }
  insertMinHeap(value: number): void {
    this.minHeap.insert(value);
  }
}
