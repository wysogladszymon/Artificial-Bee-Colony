try:
  from src.Node import Node
except:
  from Node import Node

from typing import List
import numpy as np

class DeliveryRoute:
  def __init__(self, magazine: Node):
    self.route: List[Node] = []
    self.size = 0
    self.start = magazine
    self._cost = 0
    self._changed = True

  def __getitem__(self, key) -> "Node":
    if isinstance(key, slice):
      return self.route[key.start:key.stop:key.step]
    return self.route[key]

  def __setitem__(self, key, value):
    if isinstance(key, slice):
      self.route[key.start:key.stop:key.step] = value
    else:
      self.route[key] = value

  def append(self, node: Node):
    if not isinstance(node, Node):
      raise TypeError("Only Node objects can be appended to the route.")
    if self.size == 0:
      self.route.append(node)
      self._cost = 2 * node.distance(self.start)
      self.size += 1
      self._changed = True
      return

    cost = np.inf
    index = 0
    for i in range(self.size):
      if i == 0:
        curr_cost = node.distance(self.start) + node.distance(self[i]) - self.start.distance(self[i])
      else:
        curr_cost = node.distance(self[i-1]) + node.distance(self[i]) - self[i-1].distance(self[i])
      
      if curr_cost < cost:
        index = i
        cost = curr_cost

    # Sprawdzamy koszt wstawienia na koniec
    end_cost = node.distance(self.start) + node.distance(self[-1]) - self.start.distance(self[-1])

    if end_cost < cost:
      self.route.append(node)
      self._cost += end_cost
    else:
      self.route = self.route[:index] + [node] + self.route[index:]
      self._cost += cost

    self.size += 1
    self._changed = True

  def copy(self) -> "DeliveryRoute":
    new_route = DeliveryRoute(self.start)
    new_route.route = [node.copy() for node in self.route]
    new_route.size = self.size
    new_route._cost = self._cost
    return new_route 
    
  def pop(self):
    if self.size > 0:
      # Usuwamy ostatni węzeł i aktualizujemy koszt
      if self.size == 1:
        # Mieliśmy tylko jeden węzeł
        self._cost = 0
      else:
        before = self.route[-2].distance(self.route[-1]) + self.route[-1].distance(self.start)
        after = self.route[-2].distance(self.start)
        diff = before - after
        self._cost -= diff
      self.route.pop()
      self.size -= 1
      self._changed = True

  def delete(self, index: int):
    if index >= self.size or index < 0 or self.size <= 0:
      return

    if self.size == 1:
      # Usunięcie jedynego węzła
      self._cost = 0
      self.route.pop()
      self.size = 0
      self._changed = True
      return

    if index == 0:
      before = self.start.distance(self.route[0]) + self.route[0].distance(self.route[1])
      after = self.start.distance(self.route[1])
      diff = before - after
    elif index == self.size - 1:
      before = self.route[-2].distance(self.route[-1]) + self.route[-1].distance(self.start)
      after = self.route[-2].distance(self.start)
      diff = before - after
    else:
      before = self.route[index - 1].distance(self.route[index]) + self.route[index].distance(self.route[index + 1])
      after = self.route[index - 1].distance(self.route[index + 1])
      diff = before - after

    self._cost -= diff
    self.route.pop(index)
    self.size -= 1
    self._changed = True

  # Neighborhood definitions
  def swap_random(self, other: "DeliveryRoute"):
    if self.size == 0 or other.size == 0:
      return
    i = np.random.randint(0, self.size)
    j = np.random.randint(0, other.size)
    node_from_self = self.route[i]
    node_from_other = other.route[j]

    # Usuwamy wybrane węzły i wstawiamy je do przeciwnej trasy
    self.delete(i)
    other.delete(j)
    self.append(node_from_other)
    other.append(node_from_self)

    self._changed = True
    other._changed = True

  def move_random(self, other: "DeliveryRoute"):
    if self.size == 0:
      return
    i = np.random.randint(0, self.size)
    node = self.route[i]
    self.delete(i)
    other.append(node)
    self._changed = True
    other._changed = True
  
  def cost(self):
    if self.size < 1:
      return 0
    return self._cost

  def __iter__(self):
    return iter(self.route)
