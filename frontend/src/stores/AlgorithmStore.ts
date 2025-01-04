import { observable, action, computed } from "mobx";
import { RoutePlaner } from "../types/RoutePlaner";
import { Node } from "../types/Node";
import { DeliveryRoute } from "@/types/DeliveryRoute";

type BeeAlgorithmParams = {
  courierCount: number;
  nodes: Node[];
  magazine: Node;
  bp: number;
  mcn: number;
  p?: number;
  employedBeesRatio?: number;
  maximumCourierDistance?: number;
};

export class AlgorithmStore {
  @observable accessor isRunning = false;
  @observable accessor iteration = 0;
  @observable accessor costArray: number[] = [];
  @observable accessor solution: RoutePlaner | null = null;
  @observable accessor fitness = 0;

  @action setSollution(solution: RoutePlaner) {
    this.solution = solution;
  }

  @computed get hasSolution() {
    return this.solution !== null;
  }

  @action removeSolution() {
    this.solution = null;
    this.costArray = [];
    this.iteration = 0;
  }

  @action async artificialBeeColonyAlgorithm({
    courierCount,
    nodes,
    magazine,
    bp,
    mcn,
    p = 10,
    employedBeesRatio = 0.5,
    maximumCourierDistance = 100,
  }: BeeAlgorithmParams): Promise<RoutePlaner> {
    if (courierCount == 1) {
      const deliveryRoute = new DeliveryRoute(magazine, maximumCourierDistance);
      for (const node of nodes) {
        deliveryRoute.append(node);
      }
      const rp = new RoutePlaner(
        courierCount,
        magazine,
        [deliveryRoute],
        maximumCourierDistance
      );
      this.solution = rp;
      this.fitness = rp.fitness();
      this.isRunning = false;
      this.costArray = [rp.fitness()];
      this.iteration = 1;
      return rp;
    }

    this.iteration = 0;
    this.isRunning = true;
    this.fitness = 0;
    this.costArray = [];

    const foodSourceCount = Math.floor(bp * employedBeesRatio);
    const onlookerBeesCount = bp - foodSourceCount;
    const foodSources: RoutePlaner[] = Array.from(
      { length: foodSourceCount },
      () =>
        RoutePlaner.createRandomSolution(
          courierCount,
          magazine,
          nodes,
          maximumCourierDistance
        )
    );
    const iterationsWithoutImprovement = Array(foodSourceCount).fill(0);
    let bestSolution = foodSources[0];
    let minFitness = Infinity;
    foodSources.forEach((foodSource) => {
      const fitness = foodSource.fitness();
      if (fitness < minFitness) {
        minFitness = fitness;
        bestSolution = foodSource;
      }
    });
    let minFitnessIteration = minFitness;
    let bestIterationSolution = bestSolution;
    try {
      for (let i = 0; i < mcn; i++) {
        for (let j = 0; j < foodSourceCount; j++) {
          const prevCost = foodSources[j].fitness();
          const newSol = foodSources[j].performNeighborhoodOperation();
          const newCost = newSol.fitness();
          if (newCost < prevCost) {
            foodSources[j] = newSol;
            iterationsWithoutImprovement[j] = 0;
          } else {
            iterationsWithoutImprovement[j] += 1;
          }
        }

        const costs = foodSources.map((foodSource) => foodSource.fitness());
        const costsSum = costs.reduce((sum, cost) => sum + cost, 0);
        const probs = costs.map((cost) => cost / costsSum);

        for (let j = 0; j < onlookerBeesCount; j++) {
          const chosenIndex = this.weightedRandomChoice(probs);
          const prevCost = costs[chosenIndex];
          const newSol =
            foodSources[chosenIndex].performNeighborhoodOperation();
          const newCost = newSol.fitness();
          if (newCost < prevCost) {
            foodSources[chosenIndex] = newSol;
            iterationsWithoutImprovement[chosenIndex] = 0;
            costs[chosenIndex] = newCost;
          } else {
            iterationsWithoutImprovement[chosenIndex] += 1;
          }
        }

        for (let j = 0; j < foodSourceCount; j++) {
          if (iterationsWithoutImprovement[j] > p) {
            foodSources[j] = RoutePlaner.createRandomSolution(
              courierCount,
              magazine,
              nodes,
              maximumCourierDistance
            );
            iterationsWithoutImprovement[j] = 0;
          }
        }

        this.iteration = i + 1;

        minFitnessIteration = Infinity;
        foodSources.forEach((foodSource) => {
          const fitness = foodSource.fitness();
          if (fitness < minFitnessIteration) {
            minFitnessIteration = fitness;
            bestIterationSolution = foodSource;
            if (fitness < minFitness) {
              bestSolution = foodSource;
              minFitness = fitness;
            }
          }
        });

        this.costArray.push(minFitnessIteration);
        if (i % 100 === 99) {
          this.solution = bestIterationSolution;
          await new Promise((resolve) => setTimeout(resolve, 0));
          this.fitness = minFitness;
        }
      }
    } finally {
      this.isRunning = false;
      this.solution = bestSolution;
      this.fitness = minFitness;
    }

    return this.solution;
  }

  @action weightedRandomChoice(weights: number[]): number {
    const cumulativeWeights = weights.map(
      (
        (sum) => (value) =>
          (sum += value)
      )(0)
    );
    const random =
      Math.random() * cumulativeWeights[cumulativeWeights.length - 1];
    return cumulativeWeights.findIndex((weight) => random < weight);
  }
}
