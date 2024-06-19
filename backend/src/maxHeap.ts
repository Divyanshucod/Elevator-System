class MaxHeap {
    heap: number[];

    private static instance: MaxHeap;

    private constructor() {
        this.heap = [];
    }

    public static getInstance(): MaxHeap {
        if (!MaxHeap.instance) {
            MaxHeap.instance = new MaxHeap();
        }
        return MaxHeap.instance;
    }

    insert(value: number): void {
        this.heap.push(value);
        this.heapifyUp(this.heap.length - 1);
    }

    extractMax(): number {
        if (this.isEmpty()) {
            throw new Error('Heap is empty');
        }
        const maxValue = this.heap[0];
        const lastValue = this.heap.pop()!;
        if (!this.isEmpty()) {
            this.heap[0] = lastValue;
            this.heapifyDown(0);
        }
        return maxValue;
    }

    isEmpty(): boolean {
        return this.heap.length === 0;
    }

    heapifyUp(index: number): void {
        let currentIndex = index;
        while (currentIndex > 0) {
            const parentIndex = Math.floor((currentIndex - 1) / 2);
            if (this.heap[parentIndex] < this.heap[currentIndex]) {
                [this.heap[parentIndex], this.heap[currentIndex]] = [this.heap[currentIndex], this.heap[parentIndex]];
                currentIndex = parentIndex;
            } else {
                break;
            }
        }
    }

    heapifyDown(index: number): void {
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
            } else {
                break;
            }
        }
    }

    checkMaxvalue(): number {
        if (this.heap.length === 0) {
            return -1;
        }
        return this.heap[0];
    }
}

export default MaxHeap;
