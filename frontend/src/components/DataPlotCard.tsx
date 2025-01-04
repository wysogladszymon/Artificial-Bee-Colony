import { observer } from "mobx-react-lite";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useStores } from "@/hooks/useStores";
import { DataPlot } from "./PlotTemplates/DataPlot";

export const DataPlotCard = observer(() => {
  const stores = useStores();
  const { parameterStore } = stores;

  const activateModal = () => {
    parameterStore?.chooseDataModal();
    parameterStore?.setShowModal(true);
  };

  return (
    <Card
      className="w-[450px] h-[450px] hover:cursor-pointer bg-white items-center"
      onClick={() => activateModal()}
    >
      <CardHeader>
        <CardTitle>Data Plot</CardTitle>
        <CardDescription>It shows data points.</CardDescription>
      </CardHeader>
      <CardContent className="h-[350px]">
        <DataPlot />
      </CardContent>
    </Card>
  );
});
