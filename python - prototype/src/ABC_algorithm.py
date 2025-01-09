try:
  from RoutePlaner import RoutePlaner
  from Node import Node
except:
  from src.RoutePlaner import RoutePlaner
  from src.Node import Node
from typing import List
import numpy as np

# params:
# - bee population (bp)
# - maximum cycle number (mcn)
# - limit after which food source is abandoned (p)
# - number of food source (fs_count = bp / 2)

def artifical_bee_colony_algorithm(courier_count, nodes : List[Node], magazine : Node, bp, mcn, p = 10, employed_bees_ratio = 0.5):
  food_source_count = int(bp * employed_bees_ratio)
  onlooker_bees_count = bp - food_source_count
  food_sources = [RoutePlaner.create_random_solution(courier_count, magazine, nodes) for _ in range(food_source_count)]
  iterations_without_improvement = [0 for _ in range(food_source_count)]
  
  # iterate to find best solution
  for i in range(mcn):
    
    # employed bees - they explore neighborhoods uniformly
    for j in range(food_source_count):
      prev_cost = food_sources[j].fitness()
      new_sol = food_sources[j].perform_neighborhood_operation()
      new_cost = new_sol.fitness()
      if new_cost < prev_cost:
        food_sources[j] = new_sol
        iterations_without_improvement[j] = 0
      else:
        iterations_without_improvement[j] += 1
    
    # calculate probabilities for onlooker bees
    costs = [food_source.fitness() for food_source in food_sources]
    costs_sum = sum(costs)
    probs = costs / costs_sum
    
    # onlooker bees
    for j in range(onlooker_bees_count):
      chosen_index = np.random.choice(food_source_count, p=probs)
      prev_cost = costs[chosen_index]
      new_sol = food_sources[chosen_index].perform_neighborhood_operation()
      new_cost = new_sol.fitness()
      if new_cost < prev_cost:
        food_sources[chosen_index] = new_sol
        iterations_without_improvement[chosen_index] = 0
        # update probs and costs
        costs[chosen_index] = new_cost
        costs_sum += new_cost - prev_cost
        probs = costs / costs_sum
      else:
        iterations_without_improvement[chosen_index] += 1
    
    # scout bees
    for j in range(food_source_count):
      if iterations_without_improvement[j] > p:
        food_sources[j] = RoutePlaner.create_random_solution(courier_count, magazine, nodes)
        iterations_without_improvement[j] = 0
    
  best_solution = min(food_sources, key=lambda x: x.fitness())
  return best_solution