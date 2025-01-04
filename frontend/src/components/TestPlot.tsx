import {
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from "recharts";

export const MyScatterPlot = () => {
  const data = [
    { x: 1, y: 2 },
    { x: 2, y: 2 },
    { x: 2, y: 5 },
    { x: 1, y: 5 },
    { x: 1, y: 2 },
  ];

  return (
    <ResponsiveContainer width="100%" height={400}>
      <ScatterChart
        margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
      >
        <CartesianGrid />
        {/* 
          type="number"  – oznacza, że oś będzie traktować wartości jako liczby, 
                           co pozwala narysować niekoniecznie monotoniczną funkcję.
        */}
        <XAxis dataKey="x" type="number" />
        <YAxis dataKey="y" type="number" />
        <Tooltip cursor={{ strokeDasharray: "3 3" }} />
        <Scatter 
          name="Moje punkty" 
          data={data} 
          fill="#8884d8" 
          line 
          lineType="joint" 
        />
      </ScatterChart>
    </ResponsiveContainer>
  );
};

export default MyScatterPlot;
