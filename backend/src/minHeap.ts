class MinHeap {
    heap: number[];

    private static instance: MinHeap;

    private constructor() {
        this.heap = [];
    }

    public static getInstance(): MinHeap {
        if (!MinHeap.instance) {
            MinHeap.instance = new MinHeap();
        }
        return MinHeap.instance;
    }

    insert(value: number): void {
        this.heap.push(value);
        this.heapifyUp(this.heap.length - 1);
    }

    extractMin(): number {
        if (this.isEmpty()) {
            return -1;
        }
        const minValue = this.heap[0];
        const lastValue = this.heap.pop()!;
        if (!this.isEmpty()) {
            this.heap[0] = lastValue;
            this.heapifyDown(0);
        }
        return minValue;
    }

    isEmpty(): boolean {
        return this.heap.length === 0;
    }

    heapifyUp(index: number): void {
        let currentIndex = index;
        while (currentIndex > 0) {
            const parentIndex = Math.floor((currentIndex - 1) / 2);
            if (this.heap[parentIndex] > this.heap[currentIndex]) {
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
            } else {
                break;
            }
        }
    }

    checkMinvalue(): number {
        if (this.heap.length === 0) {
            return -1;
        }
        return this.heap[0];
    }
}

export default MinHeap;
