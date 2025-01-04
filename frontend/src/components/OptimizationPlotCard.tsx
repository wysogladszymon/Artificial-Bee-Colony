import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { observer } from "mobx-react-lite";
import { useStores } from "@/hooks/useStores";
import { OptimisationPlot } from "./PlotTemplates/OptimizationPlot";

export const OptimizationPlotCard = observer(() => {
  const stores = useStores();
  const { algorithmStore, parameterStore } = stores;

  if (algorithmStore?.iteration === 0) {
    return <></>;
  }

  const activateModal = () => {
    parameterStore?.chooseOptimizationModal();
    parameterStore?.setShowModal(true);
  };

  return (
    <Card
      className="w-[450px] h-[450px] bg-white items-center"
      onClick={activateModal}
    >
      <CardHeader>
        <CardTitle>Optimization Plot</CardTitle>
        <CardDescription>
          It shows fitness function value for each iteration.
        </CardDescription>
      </CardHeader>

      {/* Główna zawartość wykresu */}
      <CardContent className="h-[350px]">
        <OptimisationPlot />
      </CardContent>
      {/* <CardFooter className="flex justify-between"></CardFooter> */}
    </Card>
  );
});
