import { useStores } from "@/hooks/useStores";
import { observer } from "mobx-react-lite";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  ReferenceLine,
  Tooltip,
} from "recharts";

interface OptimisationPlotProps {
  tooltip?: boolean;
  widthProp?: string | number;
  heightProp?: string | number;
}

export const OptimisationPlot = observer(({tooltip = false, widthProp="100%", heightProp="100%"} : OptimisationPlotProps) => {
  const stores = useStores();
  const { algorithmStore } = stores;

  if (algorithmStore?.iteration === 0) {
    return <></>;
  }

  const data = [...Array(algorithmStore?.iteration).keys()].map((_, index) => {
    return { x: index + 1, y: algorithmStore?.costArray[index] };
  });

  return (
    <ResponsiveContainer width={widthProp} height={heightProp}>
      <LineChart
        data={data}
        margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="x"
          stroke="#000"
          label={{
            value: "Iterations",
            position: "insideBottom",
            offset: 0,
          }}
        />
        <YAxis
          dataKey="y"
          stroke="#000"
          name="Fitness"
          label={{
            value: "Fitness",
            angle: -90,
            position: "insideLeft",
            offset: -5,
          }}
        />
        <Line
          dot={false}
          activeDot={false}
          type="monotone"
          dataKey="y"
          stroke="#8884d8"
        />
        <ReferenceLine
          y={algorithmStore?.fitness ?? 0}
          stroke="red"
          strokeDasharray="3 3"
        />
        {tooltip ? <Tooltip /> : <></>}
        <Legend />
      </LineChart>
    </ResponsiveContainer>
  );
});
