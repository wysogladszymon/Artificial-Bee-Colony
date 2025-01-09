import numpy as np


class Node:
  def __init__(self, x, y):
    self.x = x
    self.y = y
    
  def __sub__(self, other):
    "substracting Points"
    if not isinstance(other, Node):
      raise TypeError
    
    return Node(self.x - other.x, self.y - other.y)
  
  def __add__(self, other):
    "adding Points"
    if not isinstance(other, Node):
      raise TypeError
    
    return Node(self.x + other.x, self.y + other.y)
  
  def copy(self):
    return Node(self.x, self.y)
  
  def distance(self, other) -> float:
    "distance of two Points"
    if not isinstance(other, Node):
      raise TypeError
    
    return np.sqrt((self.x - other.x) ** 2 + (self.y - other.y) ** 2)
  
  def __lt__(self, other):
    return self.x < other.x or (self.x == other.x and self.y < other.y)
  
  def __gt__(self, other):
    return self.x > other.x or (self.x == other.x and self.y > other.y)
  
  def __str__(self):
    return f"({self.x}, {self.y})"
  
  def __repr__(self): 
    return str(self)
  
  def __eq__(self, other):
    return self.x == other.x and self.y == other.y
  
  def __hash__(self):
    return hash((self.x, self.y))