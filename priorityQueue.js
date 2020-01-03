//This is a priority queue that will be used by the open set in the A* solver
class PriorityQueue {
    constructor() {
        this.items = [];
    };

    enqueue(item) {
        let contains = false;
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].fScore <= item.fScore) {
                this.items.splice(i, 0, item);
                contains = true;
                break;
            }
        }
        if (!contains) {
            this.items.push(item);
        }
    }

    dequeue() {
        if (this.items.length === 0) {
            return 'ERROR, PRIORITY QUEUE IS EMPTY';
        }
        return this.items.pop();
    }
}
