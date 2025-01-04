import { observer } from "mobx-react-lite";
import { useStores } from "@/hooks/useStores";
import {
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const colors = [
  "#8884d8",
  "#83a6ed",
  "#8dd1e1",
  "#a4de6c",
  "#d0ed57",
  "#ffc658",
];

interface SolutionPlotProps {
  tooltip?: boolean;
  widthProp?: string | number;
  heightProp?: string | number;
}

export const SolutionPlot = observer(
  ({
    tooltip = false,
    widthProp = "100%",
    heightProp = "100%",
  }: SolutionPlotProps) => {
    const stores = useStores();
    const { algorithmStore, parameterStore } = stores;
    if (!algorithmStore || !parameterStore) return null;

    const scatterData = algorithmStore?.solution?.routes?.map(
      (deliveryRoute) => {
        return deliveryRoute.route.map((node) => {
          return { x: node.x, y: node.y };
        });
      }
    );

    scatterData?.forEach((route) => {
      route.unshift({
        x: parameterStore?.magazine.x ?? 0,
        y: parameterStore?.magazine.y ?? 0,
      });
      route.push({
        x: parameterStore?.magazine.x ?? 0,
        y: parameterStore?.magazine.y ?? 0,
      });
    });

    const scatterPlots = scatterData?.map((route, index) => {
      return (
        <Scatter
          key={index}
          name={`Route ${index}`}
          data={route}
          fill={colors[index % colors.length]}
          line
          lineType="joint"
        />
      );
    });
    return (
      <ResponsiveContainer width={widthProp} height={heightProp}>
        <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          <CartesianGrid />
          <XAxis dataKey="x" type="number" />
          <YAxis dataKey="y" type="number" />
          {scatterPlots}
          <Scatter
            name="Magazine"
            data={[
              {
                x: parameterStore?.magazine.x,
                y: parameterStore?.magazine.y,
              },
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
