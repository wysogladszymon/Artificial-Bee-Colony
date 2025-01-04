import { observer } from "mobx-react-lite";
import { useStores } from "../hooks/useStores";
import { Button, Table } from "react-bootstrap";
import { SvgWarning } from "../icons/SvgWarning";
import { Node } from "../types/Node";

export const VisualizeData = observer(() => {
  const stores = useStores();
  const { parameterStore } = stores;

  if (!parameterStore || parameterStore.nodes.length === 0) {
    return (
      <div className="flex items-center justify-center w-full h-full mt-3">
        <SvgWarning />
        <p className="mb-0 ml-2 text-md text-gray-400">
          Please load some data.
        </p>
      </div>
    );
  }

  const removeDuplicates = () => {
    const uniqueNodes: Node[] = [];
    const nodeMap = new Map();

    parameterStore.nodes.forEach((node) => {
      const key = `${node.x}-${node.y}`;
      if (!nodeMap.has(key)) {
        nodeMap.set(key, true);
        uniqueNodes.push(node);
      }
    });

    parameterStore.setNodes(uniqueNodes);
  };

  const generateCsv = (): string => {
    const header = "X,Y";
    const csvRows = parameterStore.nodes.map((node) => {
      return `${node.x},${node.y}`;
    });

    return [header, ...csvRows].join("\n");
  };

  const downloadData = () => {
    const csvContent = generateCsv();
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "data.csv");
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const cleanData = () => {
    parameterStore.setNodes([]);
  };
  return (
    <div className="m-3 d-flex flex-column align-items-center">
      <div className="d-flex justify-content-center w-100 my-3 gap-3">
        <Button onClick={removeDuplicates}>Remove Duplicates</Button>
        <Button onClick={downloadData}>Download Data</Button>
        <Button onClick={cleanData}>Clean Data</Button>
      </div>
      <div style={{ maxHeight: "80vh", overflowY: "auto", width: "100%" }}>
        <Table striped bordered hover size="sm" className="equal-width-table">
          <thead
            style={{
              position: "sticky",
              top: 0,
              backgroundColor: "#fff",
              zIndex: 10,
            }}
          >
            <tr>
              <th className="text-center">#</th>
              <th className="text-center">X</th>
              <th className="text-center">Y</th>
            </tr>
          </thead>
          <tbody>
            {parameterStore?.nodes.map((node, index) => {
              return (
                <tr key={index}>
                  <td className="text-center">{index + 1}</td>
                  <td className="text-center">{node.x}</td>
                  <td className="text-center">{node.y}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
});
