import React, { useState } from "react";
import axios from "axios";
import FarmGrid from "./components/FarmGrid"; // <-- 1. Import
import "./App.css";
import "./components/FarmGrid.css"; // <-- 2. Import CSS

// Helper function to create our initial grid
const createInitialGrid = () => {
  const cells = [];
  for (let i = 1; i <= 25; i++) {
    cells.push({ id: i, status: "healthy" }); // All cells start as healthy
  }
  return cells;
};

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);

  // --- New Grid State ---
  const [gridData, setGridData] = useState(createInitialGrid());
  const [selectedCell, setSelectedCell] = useState(null); // Which cell are we inspecting?

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setPrediction(null);
    setError(null);
  };

  // --- New Cell Click Handler ---
  const handleCellClick = (cellId) => {
    setSelectedCell(cellId);
    console.log("Selected cell:", cellId);
    // Reset file/prediction when clicking a new cell
    setSelectedFile(null);
    setPrediction(null);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError("Please select an image file.");
      return;
    }
    if (!selectedCell) {
      setError("Please select a grid cell to inspect first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/predict",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      const newPrediction = response.data;
      setPrediction(newPrediction);

      // --- HERE'S THE MAGIC: Update the grid! ---
      // We check if the prediction is NOT healthy
      const isHealthy = newPrediction.prediction.includes("healthy");

      setGridData((prevGrid) =>
        prevGrid.map((cell) =>
          cell.id === selectedCell
            ? { ...cell, status: isHealthy ? "healthy" : "infected" }
            : cell
        )
      );
    } catch (err) {
      console.error(err);
      setError("Failed to get prediction. Is the backend server running?");
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>🌱 Krishi Mitra</h1>
        <p>Smart Crop Disease Detection Simulator</p>

        {/* Render the FarmGrid component */}
        <FarmGrid gridData={gridData} onCellClick={handleCellClick} />

        <div className="controller">
          <h3>Inspection Area</h3>
          {selectedCell ? (
            <p>
              Inspecting plot: <strong>{selectedCell}</strong>
            </p>
          ) : (
            <p className="error">
              Please click a plot on the grid to inspect it.
            </p>
          )}

          <div className="uploader">
            <input
              type="file"
              onChange={handleFileChange}
              disabled={!selectedCell}
            />
            <button
              onClick={handleUpload}
              disabled={!selectedFile || !selectedCell}
            >
              Run Diagnosis
            </button>
          </div>

          {error && <p className="error">{error}</p>}

          {prediction && (
            <div className="result">
              <h3>Diagnosis Result:</h3>
              <p>
                <strong>Disease:</strong> {prediction.prediction}
              </p>
              <p>
                <strong>Confidence:</strong>{" "}
                {(prediction.confidence * 100).toFixed(2)}%
              </p>
            </div>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;
