try:
  from src.DeliveryRoute import DeliveryRoute
  from src.Node import Node
  from src.Neighborhood import Neighborhood
except:
  from DeliveryRoute import DeliveryRoute
  from Node import Node
  from Neighborhood import Neighborhood

import numpy as np
import random
from typing import List, Union
import matplotlib.pyplot as plt
import seaborn as sns
import pandas as pd


class RoutePlaner:
  def __init__(self, courier_count: int, magazine: Node, routes: Union[None, List[DeliveryRoute]] = None):
    if routes is None:
      self.routes = [DeliveryRoute(magazine) for _ in range(courier_count)]
    else:
      self.routes = [route.copy() for route in routes]
    
    self.m = courier_count
    self.start = magazine

  def copy(self):
    return RoutePlaner(self.m, self.start, self.routes)
  
  
  def perform_neighborhood_operation(self) -> "RoutePlaner":
    # return copy with applied neighborhood operation
    i = np.random.randint(0, self.m)
    j = np.random.randint(0, self.m)
    # in case if there will be 2 indices found
    while j == i:
      j = np.random.randint(0, self.m)
    new_sol = self.copy()
    Neighborhood.perform_random_neighborhood(new_sol[i], new_sol[j])
    return new_sol
  
  def create_new_solution(self) -> "RoutePlaner":
    new_sol = RoutePlaner(self.m, self.start)
    
    # need to copy nodes, to make sure, they are not reference and everything won't crash
    nodes = [Node(node.x, node.y) for delivery_route in self for node in delivery_route]
    random.shuffle(nodes)
    
    for node in nodes:
      i = np.random.randint(0, self.m)
      new_sol[i].append(node)

    return new_sol
    
  def fitness(self):
    return np.sum([route.cost() for route in self.routes])
  
  def __getitem__(self, key):
    if isinstance(key, slice):
      return self.routes[key.start:key.stop:key.step]
    return self.routes[key]

  @staticmethod
  def create_random_solution(courier_count, magazine, nodes : List[Node]):
    new_sol = RoutePlaner(courier_count, magazine)
    
    # need to copy nodes
    random.shuffle([Node(node.x, node.y) for node in nodes])
    
    for node in nodes:
      i = np.random.randint(0, courier_count)
      new_sol[i].append(node)
    return new_sol
  
  def __setitem__(self, key, value : DeliveryRoute):
    if isinstance(value, DeliveryRoute):
      if isinstance(key, slice):
        self.routes[key.start:key.stop:key.step] = value
      else:
        self.routes[key] = value
  
  def __iter__(self):
    return iter(self.routes)
  
  def to_dataframe(self):
    df = pd.DataFrame({'index' : [], 'x': [], 'y': []})
    for i in range(self.m):
      route_df = pd.DataFrame({'index' : [i for _ in range(self[i].size)], 'x': [node.x for node in self[i]], 'y': [node.y for node in self[i]]})
      df = pd.concat([df, route_df])
    return df
  
  def plot_solution(self):  
    paletteName = 'viridis'  
    df = self.to_dataframe()  
    plt.figure(figsize=(10, 6))  
    palette = sns.color_palette(paletteName, self.m)  
      
    sns.scatterplot(data=df, x='x', y='y', hue='index', palette=paletteName, s=100)  
  
    for i in range(self.m):  
      route = self[i]  
      color = palette[i % len(palette)]  
      plt.plot([self.start.x, route[0].x], [self.start.y, route[0].y], color=color, linewidth=2)  
      for j in range(route.size - 1):  
        plt.plot(  
          [route[j].x, route[j + 1].x],  
          [route[j].y, route[j + 1].y],  
          color=color,  
          linewidth=2  
        )  
      plt.plot(  
        [route[-1].x, self.start.x],  
        [route[-1].y, self.start.y],  
        color=color,  
        linewidth=2  
        )  
      
    plt.plot(self.start.x, self.start.y, 'ko', markersize=10)  
  
    # Create legend  
    handles = [plt.Line2D([0], [0], color=palette[i], lw=2, label=f'Route {i+1}') for i in range(self.m)]  
    handles.append(plt.Line2D([0], [0], color='black', marker='o', markersize=5, label='Start'))  # Legend for start point  
    plt.legend(handles=handles, title="Routes")  
  
    plt.title(f"Solution, cost={self.fitness():.2f}")  
    plt.xlabel("X")  
    plt.ylabel("Y")  
    plt.grid(True)  
    plt.show()  