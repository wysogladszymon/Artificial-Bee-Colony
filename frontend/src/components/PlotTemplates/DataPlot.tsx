import { observer } from "mobx-react-lite";
import { useStores } from "@/hooks/useStores";
import {
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  ScatterChart,
  Scatter,
} from "recharts";

interface DataPlotProps {
  tooltip?: boolean;
  widthProp?: string | number;
  heightProp?: string | number;
}
export const DataPlot = observer(
  ({
    tooltip = false,
    widthProp = "100%",
    heightProp = "100%",
  }: DataPlotProps) => {
    const stores = useStores();
    const { parameterStore } = stores;

    const data =
      parameterStore?.nodes.map((node) => {
        return { x: node.x, y: node.y };
      }) ?? [];

    return (
      <ResponsiveContainer width={widthProp} height={heightProp}>
        <ScatterChart
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="x"
            type="number"
            name="x"
            label={{ value: "X", position: "insideBottom", offset: -5 }}
          />
          <YAxis
            dataKey="y"
            type="number"
            name="y"
            label={{ value: "Y", position: "insideLeft", offset: 0 }}
          />
          <Scatter name="Nodes" data={data} fill="#8884d8" />
          <Scatter
            name="Magazine"
            data={[
              { x: parameterStore?.magazine.x, y: parameterStore?.magazine.y },
            ]}
            fill="#82ca9d"
          />
          <Legend />
          {tooltip ? <Tooltip /> : <></>}
        </ScatterChart>
      </ResponsiveContainer>
    );
  }
);
