import { observer } from "mobx-react-lite";
import { useStores } from "../hooks/useStores";
import { FloatingLabel, Form, Button } from "react-bootstrap";
import { useState } from "react";
import { SvgInfo } from "@/icons/SvgInfo";

class Range {
  start: number;
  end: number;
  leftClosed: boolean;
  rightClosed: boolean;

  constructor(a: number, b: number, leftClosed = true, rightClosed = true) {
    if (a > b) {
      this.start = b;
      this.end = a;
    } else {
      this.start = a;
      this.end = b;
    }
    this.leftClosed = leftClosed;
    this.rightClosed = rightClosed;
  }

  isInRange(x: number): boolean {
    return (
      (x > this.start && x < this.end) ||
      (this.leftClosed && x === this.start) ||
      (this.rightClosed && x === this.end)
    );
  }

  toString(): string {
    return `${this.leftClosed ? "[" : "("}${this.start}, ${this.end}${
      this.rightClosed ? "]" : ")"
    }`;
  }
}

const parameterRanges = {
  courierCount: new Range(0, 10, false, true),
  beePopulationCount: new Range(0, 10000, false, true),
  maximumCycleNumber: new Range(0, 100000, false, true),
  algorithmPatience: new Range(0, 10000, false, true),
  employedBeeRatio: new Range(0, 1, false, false),
  maximumCourierDistance: new Range(0, 100000, false, true),
};

export const ParameterForm = observer(() => {
  const stores = useStores();
  const { parameterStore } = stores;
  if (!parameterStore) return null;

  const [courierCount, setCourierCount] = useState(parameterStore.courierCount || 0);
  const [beePopulationCount, setBeePopulationCount] = useState(parameterStore.beePopulationCount || 0);
  const [maximumCycleNumber, setMaximumCycleNumber] = useState(parameterStore.maximumCycleNumber || 0);
  const [algorithmPatience, setAlgorithmPatience] = useState(parameterStore.algorithmPatience || 0);
  const [employedBeeRatio, setEmployedBeeRatio] = useState(parameterStore.employedBeeRatio || 0);
  const [maximumCourierDistance, setMaximumCourierDistance] = useState(parameterStore.maximumCourierDistance || 0);
  const [missingDataError, setMissingDataError] = useState<string>("");
  const [errors, setErrors] = useState({
    courierCount: "",
    beePopulationCount: "",
    maximumCycleNumber: "",
    algorithmPatience: "",
    employedBeeRatio: "",
    maximumCourierDistance: "",
  });
  if (parameterStore.nodes.length > 0 && missingDataError!=""){
    setMissingDataError("");
  }
  const handleSave = () => {
    const newErrors = {
      courierCount:
        parameterStore.nodes.length > 0 && !parameterRanges.courierCount.isInRange(courierCount)
          ? "Range exceeded."
          : "",
      beePopulationCount:
        parameterStore.nodes.length > 0 && !parameterRanges.beePopulationCount.isInRange(beePopulationCount)
          ? "Range exceeded."
          : "",
      maximumCycleNumber:
        parameterStore.nodes.length > 0 && !parameterRanges.maximumCycleNumber.isInRange(maximumCycleNumber)
          ? "Range exceeded."
          : "",
      algorithmPatience:
        parameterStore.nodes.length > 0 && !parameterRanges.algorithmPatience.isInRange(algorithmPatience)
          ? "Range exceeded."
          : "",
      employedBeeRatio:
        parameterStore.nodes.length > 0 && !parameterRanges.employedBeeRatio.isInRange(employedBeeRatio)
          ? "Range exceeded."
          : "",
      maximumCourierDistance:
        parameterStore.nodes.length > 0 &&
        !parameterRanges.maximumCourierDistance.isInRange(maximumCourierDistance)
          ? "Range exceeded."
          : "",
    };
    setMissingDataError(parameterStore.nodes.length > 0 ? "" : "Please load data first.");
    setErrors(newErrors);

    if (Object.values(newErrors).every((error) => error === "")) {
      parameterStore.setCourierCount(courierCount);
      parameterStore.setBeePopulationCount(beePopulationCount);
      parameterStore.setMaximumCycleNumber(maximumCycleNumber);
      parameterStore.setAlgorithmPatience(algorithmPatience);
      parameterStore.setEmployedBeeRatio(employedBeeRatio);
      parameterStore.setMaximumCourierDistance(maximumCourierDistance);
    }
  };

  return (
    <div>
      <Form>
        {missingDataError && (
          <p className="text-danger mt-1 text-red-700 text-xs">{missingDataError}</p>
        )}

        <div className="flex items-center gap-2 mb-3">
          <Form.Group className="max-w-52">
            <FloatingLabel controlId="courierCount" label="Courier Count">
              <Form.Control
                type="number"
                value={courierCount}
                className={(errors.courierCount || missingDataError) ? "is-invalid" : ""}
                onChange={(event) => setCourierCount(parseInt(event.target.value))}
              />
              {errors.courierCount && (
                <p className="text-danger mt-1 text-red-700 text-xs">{errors.courierCount}</p>
              )}
            </FloatingLabel>
          </Form.Group>
          <div className="flex items-center gap-1">
            <SvgInfo />
            <i className="text-xs text-gray-500">It should be less than half of the <br/> nodes and in range {parameterRanges.courierCount.toString()}.</i>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-3">
          <Form.Group className="max-w-52">
            <FloatingLabel controlId="beePopulationCount" label="Bee Population Count">
              <Form.Control
                type="number"
                value={beePopulationCount}
                className={(errors.beePopulationCount || missingDataError) ? "is-invalid" : ""}
                onChange={(event) => setBeePopulationCount(parseInt(event.target.value))}
              />
              {errors.beePopulationCount && (
                <p className="text-danger mt-1 text-red-700 text-xs">{errors.beePopulationCount}</p>
              )}
            </FloatingLabel>
          </Form.Group>
          <div className="flex items-center gap-1">
            <SvgInfo />
            <i className="text-xs text-gray-500">
              Range {parameterRanges.beePopulationCount.toString()}.
            </i>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-3">
          <Form.Group className="max-w-52">
            <FloatingLabel controlId="maximumCycleNumber" label="Maximum Cycle Number">
              <Form.Control
                type="number"
                value={maximumCycleNumber}
                className={(errors.maximumCycleNumber || missingDataError) ? "is-invalid" : ""}
                onChange={(event) => setMaximumCycleNumber(parseInt(event.target.value))}
              />
              {errors.maximumCycleNumber && (
                <p className="text-danger mt-1 text-red-700 text-xs">
                  {errors.maximumCycleNumber}
                </p>
              )}
            </FloatingLabel>
          </Form.Group>
          <div className="flex items-center gap-1">
            <SvgInfo />
            <i className="text-xs text-gray-500">
              Range {parameterRanges.maximumCycleNumber.toString()}.
            </i>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-3">
          <Form.Group className="max-w-52">
            <FloatingLabel controlId="algorithmPatience" label="Algorithm Patience">
              <Form.Control
                type="number"
                value={algorithmPatience}
                className={(errors.algorithmPatience || missingDataError) ? "is-invalid" : ""}
                onChange={(event) => setAlgorithmPatience(parseInt(event.target.value))}
              />
              {errors.algorithmPatience && (
                <p className="text-danger mt-1 text-red-700 text-xs">
                  {errors.algorithmPatience}
                </p>
              )}
            </FloatingLabel>
          </Form.Group>
          <div className="flex items-center gap-1">
            <SvgInfo />
            <i className="text-xs text-gray-500">
              Range {parameterRanges.algorithmPatience.toString()}.
            </i>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-3">
          <Form.Group className="max-w-52">
            <FloatingLabel controlId="employedBeeRatio" label="Employed Bee Ratio">
              <Form.Control
                type="number"
                value={employedBeeRatio}
                className={(errors.employedBeeRatio || missingDataError) ? "is-invalid" : ""}
                onChange={(event) => setEmployedBeeRatio(parseFloat(event.target.value))}
              />
              {errors.employedBeeRatio && (
                <p className="text-danger mt-1 text-red-700 text-xs">
                  {errors.employedBeeRatio}
                </p>
              )}
            </FloatingLabel>
          </Form.Group>
          <div className="flex items-center gap-1">
            <SvgInfo />
            <i className="text-xs text-gray-500">
              Range {parameterRanges.employedBeeRatio.toString()}.
            </i>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-3">
          <Form.Group className="max-w-52">
            <FloatingLabel controlId="maximumCourierDistance" label="Maximum Courier Distance">
              <Form.Control
                type="number"
                value={maximumCourierDistance}
                className={(errors.maximumCourierDistance || missingDataError) ? "is-invalid" : ""}
                onChange={(event) => setMaximumCourierDistance(parseInt(event.target.value))}
              />
              {errors.maximumCourierDistance && (
                <p className="text-danger mt-1 text-red-700 text-xs">
                  {errors.maximumCourierDistance}
                </p>
              )}
            </FloatingLabel>
          </Form.Group>
          <div className="flex items-center gap-1">
            <SvgInfo />
            <i className="text-xs text-gray-500">
              Range {parameterRanges.maximumCourierDistance.toString()}.
            </i>
          </div>
        </div>

        <div>
          <Button variant="primary" onClick={handleSave}>
            Save Parameters
          </Button>
        </div>
      </Form>
    </div>
  );
});
