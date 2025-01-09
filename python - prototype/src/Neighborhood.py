try:
  from src.Node import Node
  from src.DeliveryRoute import DeliveryRoute
except:
  from Node import Node
  from DeliveryRoute import DeliveryRoute
  
import numpy as np


class Neighborhood:  
  @staticmethod  
  def swap_random(route1 : DeliveryRoute, route2 : DeliveryRoute):  
    route1.swap_random(route2)  
    
  @staticmethod  
  def move_random(route1 : DeliveryRoute, route2 : DeliveryRoute):  
    route1.move_random(route2)  
    
  @staticmethod  
  def get_random_neighborhood():  
    return np.random.choice(Neighborhood.neighborhoods)  
    
  @staticmethod  
  def perform_random_neighborhood(route1 : DeliveryRoute, route2 : DeliveryRoute):  
    method = Neighborhood.get_random_neighborhood()  
    while method == Neighborhood.move_random and route1.size <= 1:
      if route2.size > 1:
        method(route2, route1)
        return   
      method = Neighborhood.get_random_neighborhood() 
    method(route1, route2)  
  
Neighborhood.neighborhoods = [  
    Neighborhood.swap_random,  
    Neighborhood.move_random,  
]  