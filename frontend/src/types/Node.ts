export class Node {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  subtract(other: Node): Node {
    if (!(other instanceof Node)) {
      throw new TypeError("Argument must be an instance of Node");
    }
    return new Node(this.x - other.x, this.y - other.y);
  }

  add(other: Node): Node {
    if (!(other instanceof Node)) {
      throw new TypeError("Argument must be an instance of Node");
    }
    return new Node(this.x + other.x, this.y + other.y);
  }

  copy(): Node {
    return new Node(this.x, this.y);
  }

  distance(other: Node): number {
    if (!(other instanceof Node)) {
      throw new TypeError("Argument must be an instance of Node");
    }
    return Math.sqrt(Math.pow(this.x - other.x, 2) + Math.pow(this.y - other.y, 2));
  }

  lessThan(other: Node): boolean {
    return this.x < other.x || (this.x === other.x && this.y < other.y);
  }

  greaterThan(other: Node): boolean {
    return this.x > other.x || (this.x === other.x && this.y > other.y);
  }

  toString(): string {
    return `(${this.x}, ${this.y})`;
  }

  equals(other: Node): boolean {
    return this.x === other.x && this.y === other.y;
  }

  hash(): string {
    return `${this.x},${this.y}`;
  }
}