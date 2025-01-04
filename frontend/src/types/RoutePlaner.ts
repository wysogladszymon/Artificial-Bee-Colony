import { DeliveryRoute } from './DeliveryRoute';
import { Node } from './Node';
import { Neighborhood } from './Neighborhood';

export class RoutePlaner {
  routes: DeliveryRoute[];
  m: number;
  start: Node;
  maximumCourierDistance: number;

  constructor(
    courierCount: number,
    magazine: Node,
    routes?: DeliveryRoute[],
    maximumCourierDistance = 100
  ) {
    if (!routes) {
      this.routes = Array.from({ length: courierCount }, () =>
        new DeliveryRoute(magazine, maximumCourierDistance)
      );
    } else {
      this.routes = routes.map((route) => route.copy());
    }
    this.maximumCourierDistance = maximumCourierDistance;
    this.m = courierCount;
    this.start = magazine;
  }

  copy(): RoutePlaner {
    return new RoutePlaner(
      this.m,
      this.start,
      this.routes,
      this.maximumCourierDistance
    );
  }

  performNeighborhoodOperation(): RoutePlaner {
    const i = Math.floor(Math.random() * this.m);
    let j = Math.floor(Math.random() * this.m);
    while (j === i) {
      j = Math.floor(Math.random() * this.m);
    }
    const newSol = this.copy();
    Neighborhood.performRandomNeighborhood(newSol.routes[i], newSol.routes[j]);
    return newSol;
  }

  createNewSolution(): RoutePlaner {
    const newSol = new RoutePlaner(
      this.m,
      this.start,
      undefined,
      this.maximumCourierDistance
    );
    const nodes: Node[] = this.routes.flatMap((route) =>
      route.route.map((node) => new Node(node.x, node.y))
    );
    nodes.sort(() => Math.random() - 0.5);
    for (const node of nodes) {
      const i = Math.floor(Math.random() * this.m);
      newSol.routes[i].append(node);
    }
    return newSol;
  }

  fitness(): number {
    return this.routes.reduce((sum, route) => sum + route.cost(), 0);
  }

  distance(): number {
    return this.routes.reduce((sum, route) => sum + route.distance(), 0);
  }

  get(
    key: number | { start?: number; stop?: number; step?: number }
  ): DeliveryRoute | DeliveryRoute[] {
    if (typeof key === 'object') {
      const { start = 0, stop = this.routes.length, step = 1 } = key;
      return this.routes.slice(start, stop).filter((_, index) => index % step === 0);
    }
    return this.routes[key];
  }

  set(
    key: number | { start?: number; stop?: number; step?: number },
    value: DeliveryRoute | DeliveryRoute[]
  ): void {
    if (typeof key === 'object') {
      const { start = 0, stop = this.routes.length } = key;
      this.routes.splice(start, stop - start, ...(value as DeliveryRoute[]));
    } else {
      this.routes[key] = value as DeliveryRoute;
    }
  }

  static createRandomSolution(
    courierCount: number,
    magazine: Node,
    nodes: Node[],
    maximumCourierDistance = 100
  ): RoutePlaner {
    const newSol = new RoutePlaner(courierCount, magazine, undefined, maximumCourierDistance);
    nodes = nodes
      .map((node) => node.copy())
      .sort(() => Math.random() - 0.5);
  
    // Distribute at least one node to each courier
    for (let i = 0; i < courierCount; i++) {
      if (i < nodes.length) {
        newSol.routes[i].append(nodes[i]);
      }
    }
  
    // Distribute the remaining nodes randomly
    for (let i = courierCount; i < nodes.length; i++) {
      const j = Math.floor(Math.random() * courierCount);
      newSol.routes[j].append(nodes[i]);
    }
  
    return newSol;
  }  

  [Symbol.iterator](): Iterator<DeliveryRoute> {
    return this.routes[Symbol.iterator]();
  }
}
