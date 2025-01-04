import {DeliveryRoute} from './DeliveryRoute';

export class Neighborhood {
  static swapRandom(route1: DeliveryRoute, route2: DeliveryRoute): void {
    route1.swapRandom(route2);
  }

  static moveRandom(route1: DeliveryRoute, route2: DeliveryRoute): void {
    route1.moveRandom(route2);
  }

  static getRandomNeighborhood(): (route1: DeliveryRoute, route2: DeliveryRoute) => void {
    return Neighborhood.neighborhoods[Math.floor(Math.random() * Neighborhood.neighborhoods.length)];
  }

  static performRandomNeighborhood(route1: DeliveryRoute, route2: DeliveryRoute): void {
    let method = Neighborhood.getRandomNeighborhood();
    while (method === Neighborhood.moveRandom && route1.size <= 1) {
      if (route2.size > 1) {
        method(route2, route1);
        return;
      }
      method = Neighborhood.getRandomNeighborhood();
    }
    method(route1, route2);
  }

  static neighborhoods = [
    Neighborhood.swapRandom,
    Neighborhood.moveRandom,
  ];
}