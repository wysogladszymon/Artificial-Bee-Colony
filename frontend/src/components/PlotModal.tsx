import { observer } from "mobx-react-lite";
import { Modal } from "react-bootstrap";
import { useStores } from "@/hooks/useStores";
import { OptimisationPlot } from "./PlotTemplates/OptimizationPlot";
import { DataPlot } from "./PlotTemplates/DataPlot";
import { SolutionPlot } from "./PlotTemplates/SolutionPlot";

export const PlotModal = observer(() => {
  const { parameterStore } = useStores();

  const handleCloseModal = () => {
    parameterStore?.setShowModal(false);
  };

  let plot;
  switch (parameterStore?.shownModal) {
    case "solution":
      plot = (
        <SolutionPlot heightProp={400} widthProp={"100%"} tooltip={true} />
      );
      break;
    case "optimization":
      plot = (
        <OptimisationPlot widthProp={"100%"} heightProp={400} tooltip={true} />
      );
      break;
    case "data":
      plot = <DataPlot heightProp={400} widthProp={"100%"} tooltip={true} />;
      break;
    default:
      plot = <>No plot to display</>;
  }

  return (
    <Modal
      className="add-modal"
      show={parameterStore?.showModal}
      onHide={handleCloseModal}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
      keyboard
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {parameterStore?.shownModal === "solution"
            ? "Solution Plot"
            : parameterStore?.shownModal === "optimization"
            ? "Optimization Plot"
            : parameterStore?.shownModal === "data"
            ? "Data Plot"
            : "No Plot"}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="modal-body-custom">
        <div style={{ width: "100%", minHeight: "400px" }}>{plot}</div>
      </Modal.Body>
    </Modal>
  );
});
