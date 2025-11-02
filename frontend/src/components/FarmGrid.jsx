import React from "react";
import "./FarmGrid.css"; // We'll create this file next for styling

// A single cell in our grid
function GridCell({ cell, onClick }) {
  // 'cell' will be an object like { id: 1, status: 'healthy' }
  return (
    <div
      className={`grid-cell ${cell.status}`}
      onClick={() => onClick(cell.id)}
    >
      {cell.id}
    </div>
  );
}

// The main grid component
function FarmGrid({ gridData, onCellClick }) {
  return (
    <div className="farm-grid">
      {gridData.map((cell) => (
        <GridCell key={cell.id} cell={cell} onClick={onCellClick} />
      ))}
    </div>
  );
}

export default FarmGrid;
