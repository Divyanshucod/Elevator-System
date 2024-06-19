"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MaxHeap {
    constructor() {
        this.heap = [];
    }
    static getInstance() {
        if (!MaxHeap.instance) {
            MaxHeap.instance = new MaxHeap();
        }
        return MaxHeap.instance;
    }
    insert(value) {
        this.heap.push(value);
        this.heapifyUp(this.heap.length - 1);
    }
    extractMax() {
        if (this.isEmpty()) {
            throw new Error('Heap is empty');
        }
        const maxValue = this.heap[0];
        const lastValue = this.heap.pop();
        if (!this.isEmpty()) {
            this.heap[0] = lastValue;
            this.heapifyDown(0);
        }
        return maxValue;
    }
    isEmpty() {
        return this.heap.length === 0;
    }
    heapifyUp(index) {
        let currentIndex = index;
        while (currentIndex > 0) {
            const parentIndex = Math.floor((currentIndex - 1) / 2);
            if (this.heap[parentIndex] < this.heap[currentIndex]) {
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
            let largestChildIndex = currentIndex;
            if (leftChildIndex < this.heap.length && this.heap[leftChildIndex] > this.heap[largestChildIndex]) {
                largestChildIndex = leftChildIndex;
            }
            if (rightChildIndex < this.heap.length && this.heap[rightChildIndex] > this.heap[largestChildIndex]) {
                largestChildIndex = rightChildIndex;
            }
            if (largestChildIndex !== currentIndex) {
                [this.heap[currentIndex], this.heap[largestChildIndex]] = [this.heap[largestChildIndex], this.heap[currentIndex]];
                currentIndex = largestChildIndex;
            }
            else {
                break;
            }
        }
    }
    checkMaxvalue() {
        if (this.heap.length === 0) {
            return -1;
        }
        return this.heap[0];
    }
}
exports.default = MaxHeap;
