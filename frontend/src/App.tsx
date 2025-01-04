import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { observer } from "mobx-react-lite";
import { LandingPage } from "./components/LandingPage";
import { PlotModal } from "./components/PlotModal";

function App() {
  return (
    <>
      <LandingPage />
      <PlotModal />
    </>
  );
}

export default observer(App);
