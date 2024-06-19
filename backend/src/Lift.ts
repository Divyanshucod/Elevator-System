import { LiftAlgorithm } from './LiftAlgorithms';

export class Lift extends LiftAlgorithm {
  private noOfFloors: number;
  
  constructor(noOfFloors: number = 5) {
    super();
    this.noOfFloors = noOfFloors;
  }
}

export function createInstance(noOfFloors: number = 5): Lift {
  return  new Lift(noOfFloors);
}
