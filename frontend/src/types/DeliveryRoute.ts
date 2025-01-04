import {Node} from './Node';

export class DeliveryRoute {
  route: Node[];
  size: number;
  start: Node;
  private _cost: number;
  maximumCourierDistance: number;

  constructor(magazine: Node, maximumCourierDistance = 100) {
    this.route = [];
    this.size = 0;
    this.start = magazine;
    this._cost = 0;
    this.maximumCourierDistance = maximumCourierDistance;
  }

  get(key: number | { start?: number; stop?: number; step?: number }): Node | Node[] {
    if (typeof key === 'object') {
      const { start = 0, stop = this.size, step = 1 } = key;
      return this.route.slice(start, stop).filter((_, index) => index % step === 0);
    }
    return this.route[key];
  }

  set(key: number | { start?: number; stop?: number; step?: number }, value: Node | Node[]): void {
    if (typeof key === 'object') {
      const { start = 0, stop = this.size} = key;
      this.route.splice(start, stop - start, ...(value as Node[]));
    } else {
      this.route[key] = value as Node;
    }
  }

  append(node: Node): void {
    if (!(node instanceof Node)) {
      throw new TypeError('Only Node objects can be appended to the route.');
    }
    if (this.size === 0) {
      this.route.push(node);
      this._cost = 2 * node.distance(this.start);
      this.size++;
      return;
    }

    let cost = Infinity;
    let index = 0;
    for (let i = 0; i < this.size; i++) {
      let currCost;
      if (i === 0) {
        currCost = node.distance(this.start) + node.distance(this.route[i]) - this.start.distance(this.route[i]);
      } else {
        currCost = node.distance(this.route[i - 1]) + node.distance(this.route[i]) - this.route[i - 1].distance(this.route[i]);
      }

      if (currCost < cost) {
        index = i;
        cost = currCost;
      }
    }

    const endCost = node.distance(this.start) + node.distance(this.route[this.size - 1]) - this.start.distance(this.route[this.size - 1]);

    if (endCost < cost) {
      this.route.push(node);
      this._cost += endCost;
    } else {
      this.route.splice(index, 0, node);
      this._cost += cost;
    }

    this.size++;
  }

  copy(): DeliveryRoute {
    const newRoute = new DeliveryRoute(this.start, this.maximumCourierDistance);
    newRoute.route = this.route.map(node => node.copy());
    newRoute.size = this.size;
    newRoute._cost = this._cost;
    return newRoute;
  }

  pop(): void {
    if (this.size > 0) {
      if (this.size === 1) {
        this._cost = 0;
      } else {
        const before = this.route[this.size - 2].distance(this.route[this.size - 1]) + this.route[this.size - 1].distance(this.start);
        const after = this.route[this.size - 2].distance(this.start);
        const diff = before - after;
        this._cost -= diff;
      }
      this.route.pop();
      this.size--;
    }
  }

  delete(index: number): void {
    if (index >= this.size || index < 0 || this.size <= 0) {
      return;
    }

    if (this.size === 1) {
      this._cost = 0;
      this.route.pop();
      this.size = 0;
      return;
    }

    let diff;
    if (index === 0) {
      const before = this.start.distance(this.route[0]) + this.route[0].distance(this.route[1]);
      const after = this.start.distance(this.route[1]);
      diff = before - after;
    } else if (index === this.size - 1) {
      const before = this.route[this.size - 2].distance(this.route[this.size - 1]) + this.route[this.size - 1].distance(this.start);
      const after = this.route[this.size - 2].distance(this.start);
      diff = before - after;
    } else {
      const before = this.route[index - 1].distance(this.route[index]) + this.route[index].distance(this.route[index + 1]);
      const after = this.route[index - 1].distance(this.route[index + 1]);
      diff = before - after;
    }

    this._cost -= diff;
    this.route.splice(index, 1);
    this.size--;
  }

  swapRandom(other: DeliveryRoute): void {
    if (this.size === 0 || other.size === 0) {
      return;
    }
    const i = Math.floor(Math.random() * this.size);
    const j = Math.floor(Math.random() * other.size);

    const nodeFromSelf = this.route[i];
    const nodeFromOther = other.route[j];

    this.delete(i);
    other.delete(j);
    this.append(nodeFromOther);
    other.append(nodeFromSelf);

  }

  moveRandom(other: DeliveryRoute): void {
    if (this.size === 0) {
      return;
    }
    const i = Math.floor(Math.random() * this.size);
    const node = this.route[i];
    this.delete(i);
    other.append(node);
  }

  cost(): number {
    if (this.size < 1) {
      return 0;
    }

    if (this._cost > this.maximumCourierDistance) {
      return this._cost * 2 - this.maximumCourierDistance;
    }
    else{
      return this._cost;
    }
  }

  distance(): number {
    if (this.size < 1) {
      return 0;
    }

    return this._cost;
  }

  [Symbol.iterator](): Iterator<Node> {
    return this.route[Symbol.iterator]();
  }
}