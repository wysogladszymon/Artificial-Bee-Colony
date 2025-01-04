import { observer } from "mobx-react-lite";
import { FloatingLabel, Form, Button, Row, Col } from "react-bootstrap";
import { useState } from "react";
import { randomGenerator } from "../utils/random";
import { Node } from "../types/Node";
import { useStores } from "../hooks/useStores";
const precision = 3;

export const GenerateRandomData = observer(() => {
  const [rangeMin, setRangeMin] = useState<number>(-100);
  const [rangeMax, setRangeMax] = useState<number>(100);
  const [quantity, setQuantity] = useState<number>(20);
  const [isInteger, setIsInteger] = useState<boolean>(true); 

  const stores = useStores();
  const {parameterStore, algorithmStore} = stores;
  if (!algorithmStore || !parameterStore) return null;
  const handleGenerate = () => {
    const nodes: Node[] = [];
    if (isInteger){
      for (let i = 0; i < quantity; i++) {
        let x = randomGenerator.integer(rangeMin, rangeMax);
        let y =  randomGenerator.integer(rangeMin, rangeMax);
        let node = new Node(x, y);
        nodes.push(node);
      }
    }
    else{
      for (let i = 0; i < quantity; i++) {
        let x = parseFloat(randomGenerator.real(rangeMin, rangeMax).toFixed(precision));
        let y =  parseFloat(randomGenerator.real(rangeMin, rangeMax).toFixed(precision));
        let node = new Node(x, y);
        nodes.push(node);
      }
    }
    parameterStore?.setNodes(nodes);
    algorithmStore?.removeSolution();
  };

  return (
    <div className="mx-[3rem] mb-3">
      <h4 className="mb-3">Generate Random Data</h4>
      <Form>
        {/* Checkbox na górze */}
        <Form.Group controlId="integerCoordinates" className="mb-3">
          <Form.Check
            type="checkbox"
            label="Integer coordinates"
            checked={isInteger}
            onChange={(e) => setIsInteger(e.target.checked)}
          />
        </Form.Group>

        <Row className="mb-3">
          <Col>
            <FloatingLabel controlId="rangeMin" label="Range Min">
              <Form.Control
                type="number"
                placeholder="Minimum"
                value={rangeMin}
                onChange={(e) => setRangeMin(Number(e.target.value))}
              />
            </FloatingLabel>
          </Col>
          <Col>
            <FloatingLabel controlId="rangeMax" label="Range Max">
              <Form.Control
                type="number"
                placeholder="Maximum"
                value={rangeMax}
                onChange={(e) => setRangeMax(Number(e.target.value))}
              />
            </FloatingLabel>
          </Col>
        </Row>
        <Form.Group className="mb-3">
          <FloatingLabel controlId="quantity" label="Quantity">
            <Form.Control
              type="number"
              placeholder="Quantity"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
            />
          </FloatingLabel>
        </Form.Group>
        <Button variant="primary" type="button" onClick={handleGenerate} disabled={algorithmStore.isRunning}>
          Generate
        </Button>
      </Form>
    </div>
  );
});
