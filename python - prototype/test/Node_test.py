import pytest
from src.Node import Node 

def test_init():
  node = Node(3, 4)
  assert node.x == 3
  assert node.y == 4

@pytest.mark.parametrize('a, b, expected',[
  ((1, 2), (5, 3), (6, 5)),
  ((-1, -3), (-4, 0), (-5, -3))
])
def test_add(a, b, expected):
  node1 = Node(a[0], a[1])
  node2 = Node(b[0], b[1])
  result = node1 + node2
  assert isinstance(result, Node)
  assert result.x == expected[0]
  assert result.y == expected[1]

def test_sub():
  node1 = Node(5, 7)
  node2 = Node(2, 3)
  result = node1 - node2
  assert isinstance(result, Node)
  assert result.x == 3
  assert result.y == 4

def test_add_invalid_type():
  node = Node(1, 2)
  with pytest.raises(TypeError):
    result = node + 5  

def test_sub_invalid_type():
  node = Node(1, 2)
  with pytest.raises(TypeError):
    result = node - "test"  

def test_copy():
  node1 = Node(8, 9)
  node2 = node1.copy()
  assert isinstance(node2, Node)
  assert node2.x == node1.x
  assert node2.y == node1.y
  assert node2 is not node1  

def test_distance():
  node1 = Node(0, 0)
  node2 = Node(3, 4)
  distance = node1.distance(node2)
  assert isinstance(distance, float)
  assert distance == 5.0

def test_distance_invalid_type():
  node = Node(1, 2)
  with pytest.raises(TypeError):
    distance = node.distance(None)  

def test_copy():
  node = Node(1,2)
  node_copy = node.copy()
  node_copy.x = 5
  node_copy.y = 5
  assert node.x == 1
  assert node.y == 2