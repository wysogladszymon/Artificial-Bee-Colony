import { observer } from "mobx-react-lite";
import Table from "react-bootstrap/Table";
import { useStores } from "../hooks/useStores";

export const ParameterTable = observer(() => {
  const stores = useStores();
  const { parameterStore } = stores;

  return (
    <Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th className="text-center">Courier Count</th>
          <th className="text-center">Bee Population Count</th>
          <th className="text-center">Maximum Cycle Number</th>
          <th className="text-center">Algorithm Patience</th>
          <th className="text-center">Employed Bee Ratio</th>
          <th className="text-center">Maximum Courier Distance</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="text-center">{parameterStore?.courierCount}</td>
          <td className="text-center">{parameterStore?.beePopulationCount}</td>
          <td className="text-center">{parameterStore?.maximumCycleNumber}</td>
          <td className="text-center">{parameterStore?.algorithmPatience}</td>
          <td className="text-center">{parameterStore?.employedBeeRatio}</td>
          <td className="text-center">{parameterStore?.maximumCourierDistance}</td>
        </tr>
      </tbody>
    </Table>
  );
});
