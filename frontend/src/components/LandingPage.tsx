import { observer } from "mobx-react-lite";
import { ResultsPage } from "./ResultsPage";
import { ParametersPage } from "./ParametersPage";

export const LandingPage = observer(() => {
  return (
    <div className={`flex w-[100vw] h-[100vh]`}>
      <div className="w-1/3 ">
        <ParametersPage />
      </div>
      <div className="w-2/3 bg-gray-200">
        <ResultsPage />
      </div>
    </div>
  );
});
