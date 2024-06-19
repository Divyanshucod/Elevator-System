"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MinHeap {
    constructor() {
        this.heap = [];
    }
    static getInstance() {
        if (!MinHeap.instance) {
            MinHeap.instance = new MinHeap();
        }
        return MinHeap.instance;
    }
    insert(value) {
        this.heap.push(value);
        this.heapifyUp(this.heap.length - 1);
    }
    extractMin() {
        if (this.isEmpty()) {
            return -1;
        }
        const minValue = this.heap[0];
        const lastValue = this.heap.pop();
        if (!this.isEmpty()) {
            this.heap[0] = lastValue;
            this.heapifyDown(0);
        }
        return minValue;
    }
    isEmpty() {
        return this.heap.length === 0;
    }
    heapifyUp(index) {
        let currentIndex = index;
        while (currentIndex > 0) {
            const parentIndex = Math.floor((currentIndex - 1) / 2);
            if (this.heap[parentIndex] > this.heap[currentIndex]) {
                [this.heap[parentIndex], this.heap[currentIndex]] = [this.heap[currentIndex], this.heap[parentIndex]];
                currentIndex = parentIndex;
            }
            else {
                break;
            }
        }
    }
    heapifyDown(index) {
        let currentIndex = index;
        while (true) {
            const leftChildIndex = 2 * currentIndex + 1;
            const rightChildIndex = 2 * currentIndex + 2;
            let smallestChildIndex = currentIndex;
            if (leftChildIndex < this.heap.length && this.heap[leftChildIndex] < this.heap[smallestChildIndex]) {
                smallestChildIndex = leftChildIndex;
            }
            if (rightChildIndex < this.heap.length && this.heap[rightChildIndex] < this.heap[smallestChildIndex]) {
                smallestChildIndex = rightChildIndex;
            }
            if (smallestChildIndex !== currentIndex) {
                [this.heap[currentIndex], this.heap[smallestChildIndex]] = [this.heap[smallestChildIndex], this.heap[currentIndex]];
                currentIndex = smallestChildIndex;
            }
            else {
                break;
            }
        }
    }
    checkMinvalue() {
        if (this.heap.length === 0) {
            return -1;
        }
        return this.heap[0];
    }
}
exports.default = MinHeap;
