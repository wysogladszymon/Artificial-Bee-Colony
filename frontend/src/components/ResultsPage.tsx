import { observer } from "mobx-react-lite";
import { ParameterTable } from "./ParameterTable";
import { OptimizationPlotCard } from "./OptimizationPlotCard";
import { SolutionPlotCard } from "./SolutionPlotCard";
import { Button, Spinner, Stack } from "react-bootstrap";
import { useStores } from "@/hooks/useStores";
import { SvgInfo } from "@/icons/SvgInfo";

export const ResultsPage = observer(() => {
  const stores = useStores();
  const { algorithmStore, parameterStore } = stores;

  if (!algorithmStore || !parameterStore) return null;

  const runBeeAlgorithm = async () => {
    if (parameterStore.nodes.length === 0) return;
    algorithmStore.isRunning = true;
    await algorithmStore.artificialBeeColonyAlgorithm({
      courierCount: parameterStore.courierCount,
      nodes: parameterStore.nodes,
      magazine: parameterStore.magazine,
      bp: parameterStore.beePopulationCount,
      mcn: parameterStore.maximumCycleNumber,
      p: parameterStore.algorithmPatience,
      employedBeesRatio: parameterStore.employedBeeRatio,
      maximumCourierDistance: parameterStore.maximumCourierDistance,
    });
    algorithmStore.isRunning = false;
  };
  return (
    <div className="p-3">
      <div className="mb-3 flex align-items-center">
        <Stack className="max-w-3xl">
          <div className="flex items-end gap-4">
            <h1>Parcel Problem</h1>
            <h2 className="text-base pb-1">Artificial Bee Colony Algorithm</h2>
          </div>
          <div className="flex items-center mx-2">
            <SvgInfo />
            <i className="mb-0 ml-2 text-xs text-gray-400">
              Extra kilometers traveled by the courier are weighted twice as
              heavily in the fitness function, as extra hours are considered
              twice as costly as extra kilometers.
            </i>
          </div>
        </Stack>
        {algorithmStore.isRunning ? (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        ) : (
          <Button onClick={runBeeAlgorithm} disabled={parameterStore.nodes.length === 0}>Run</Button>
        )}
      </div>
      <ParameterTable />
      <Stack
        direction="horizontal"
        className="gap-5 w-full justify-content-center align-items-center"
      >
        <SolutionPlotCard />
        <OptimizationPlotCard />
      </Stack>
    </div>
  );
});
