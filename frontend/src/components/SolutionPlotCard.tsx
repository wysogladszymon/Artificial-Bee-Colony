import { observer } from "mobx-react-lite";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useStores } from "@/hooks/useStores";
import { DataPlotCard } from "./DataPlotCard";
import { SolutionPlot } from "./PlotTemplates/SolutionPlot";

export const SolutionPlotCard = observer(() => {
  const stores = useStores();
  const { algorithmStore, parameterStore } = stores;
  if (!algorithmStore || !parameterStore) return null;
  if (!algorithmStore?.hasSolution) return <DataPlotCard />;

  const activateModal = () => {
    parameterStore?.chooseSolutionModal();
    parameterStore?.setShowModal(true);
  };

  const scatterData = algorithmStore?.solution?.routes?.map((deliveryRoute) => {
    return deliveryRoute.route.map((node) => {
      return { x: node.x, y: node.y };
    });
  });

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

  return (
    <Card className="w-[450px] h-[450px]" onClick={activateModal}>
      <CardHeader>
        <CardTitle>Solution Plot</CardTitle>
        <CardDescription>
          Fitness score:{" "}
          <strong>{algorithmStore.solution?.fitness().toFixed(2)}</strong>
          <br />
          Distance:{" "}
          <strong>{algorithmStore.solution?.distance().toFixed(2)}</strong>
        </CardDescription>
      </CardHeader>
      <CardContent className="h-[350px]">
        <SolutionPlot />
      </CardContent>
    </Card>
  );
});
