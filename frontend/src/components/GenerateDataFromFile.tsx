import { observer } from "mobx-react-lite";
import { SvgInfo } from "../icons/SvgInfo";
import { Button } from "react-bootstrap";
import { useState, useRef } from "react";
import Papa from "papaparse";
import { useStores } from "../hooks/useStores";
import { Node } from "../types/Node";

export const GenerateDataFromFile = observer(() => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string>("");
  const hiddenFileInput = useRef<HTMLInputElement>(null);
  const stores = useStores();
  const { parameterStore, algorithmStore } = stores;
  if (!algorithmStore || !parameterStore) return null;

  const handleFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleClickDropZone = () => {
    hiddenFileInput.current?.click();
  };

  const handleSubmit = () => {
    if (!selectedFile) {
      setError("Please select a file first.");
      return;
    }
    setError("");
    // parse the file to nodes array
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      const parsed = Papa.parse<string[]>(text, { skipEmptyLines: true });
      const nodes = parsed.data
        .filter((row) => {
          return (
            row.length === 2 &&
            !isNaN(parseFloat(row[0])) &&
            !isNaN(parseFloat(row[1]))
          );
        })
        .map((row) => {
          return new Node(parseFloat(row[0]), parseFloat(row[1]));
        });
      parameterStore?.setNodes(nodes);
    };
    reader.readAsText(selectedFile);
    algorithmStore?.removeSolution();
  };

  return (
    <div className="">
      <h4 className="mx-[3rem] mt-[2rem]">Generate Data From File</h4>
      <div className="flex items-center mx-3">
        <SvgInfo />
        <i className="mb-0 ml-2 text-sm text-gray-400">
          Each row in your .csv file should represent a point in the format "X,
          Y".
        </i>
      </div>
      <div className="mx-5">
        {/* Hidden input */}
        <input
          type="file"
          accept=".csv"
          ref={hiddenFileInput}
          style={{ display: "none" }}
          onChange={handleFileInput}
        />

        <div
          onClick={handleClickDropZone}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          style={{
            border: "2px dashed #ccc",
            borderRadius: "8px",
            padding: "20px",
            textAlign: "center",
            marginTop: "20px",
            cursor: "pointer",
          }}
        >
          Drag & drop your file here or click to select
        </div>

        {selectedFile && (
          <p style={{ marginTop: "10px" }}>
            Selected file: <strong>{selectedFile.name}</strong>
          </p>
        )}
        {error != "" && (
          <p className="text-red-700 absolute text-sm">{error}</p>
        )}
        <Button variant="primary" className="mt-4" onClick={handleSubmit} disabled={algorithmStore.isRunning}>
          Generate
        </Button>
      </div>
    </div>
  );
});
