import { observer } from "mobx-react-lite";
import { Tab, Tabs } from "react-bootstrap";
import { LoadData } from "./LoadData";
import { SetupPage } from "./SetupPage";
import { VisualizeData } from "./VisualizeData";

export const ParametersPage = observer(() => {
  return (
    <div className="h-full">
      <Tabs
        className="max-w-md"
        defaultActiveKey="Load Data"
        fill
        variant="tabs"
      >
        <Tab eventKey="Load Data" title="Load Data">
          <LoadData />
        </Tab>
        <Tab eventKey="Data" title="Data">
          <VisualizeData />
        </Tab>
        <Tab eventKey="Setup" title="Setup">
          <SetupPage />
        </Tab>
      </Tabs>
    </div>
  );
});
