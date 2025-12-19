import React, { useState } from "react";

const IrrigationCard = ({ onBackToHome }) => {
  const [crop, setCrop] = useState("");
  const [soil, setSoil] = useState("");
  const [area, setArea] = useState("");

  const [schedule, setSchedule] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const calculateIrrigation = () => {
    // Validation
    if (!crop || !soil || !area) {
      setError("Please fill all details before calculating.");
      return;
    }

    setError("");
    setSchedule(null);
    setLoading(true);

    fetch("http://127.0.0.1:8000/api/scheduler", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        crop,
        soil,
        area,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setSchedule(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Server error. Please try again.");
        setLoading(false);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-50">
      <div className="bg-white shadow-xl rounded-xl p-8 w-96 border border-green-100">
        <h2 className="text-2xl font-bold text-green-800 mb-4 text-center">
          🌾 Smart Irrigation Planner
        </h2>

        {/* Farmer Inputs */}
        <div className="space-y-3">
          <select
            value={crop}
            onChange={(e) => setCrop(e.target.value)}
            className="w-full border p-2 rounded"
          >
            <option value="">Select Crop</option>
            <option value="rice">Rice</option>
            <option value="wheat">Wheat</option>
            <option value="cotton">Cotton</option>
          </select>

          <select
            value={soil}
            onChange={(e) => setSoil(e.target.value)}
            className="w-full border p-2 rounded"
          >
            <option value="">Select Soil Type</option>
            <option value="sandy">Sandy</option>
            <option value="loamy">Loamy</option>
            <option value="clay">Clay</option>
          </select>

          <input
            type="number"
            placeholder="Field Area (acres)"
            value={area}
            onChange={(e) => setArea(e.target.value)}
            className="w-full border p-2 rounded"
          />

          <button
            onClick={calculateIrrigation}
            className="w-full bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg"
          >
            🌧️ Calculate Irrigation
          </button>
        </div>

        {/* Error */}
        {error && (
          <p className="text-red-600 text-sm mt-3 text-center">{error}</p>
        )}

        {/* Loading */}
        {loading && (
          <p className="text-green-700 font-medium mt-3 text-center">
            Calculating irrigation plan...
          </p>
        )}

        {/* Result */}
        {schedule && (
          <div className="mt-6 bg-green-50 border border-green-200 p-4 rounded">
            <p>
              🌱 <strong>Crop:</strong> {schedule.crop}
            </p>
            <p>
              💧 Give <strong>{schedule.water_needed_liters} liters</strong> of
              water
            </p>
            <p>
              ⏱️ Run irrigation for{" "}
              <strong>{schedule.duration_minutes} minutes</strong>
            </p>
            <p className="mt-2 text-green-800 font-semibold">
              📌 {schedule.message}
            </p>
          </div>
        )}

        {/* Back Button (optional) */}
        {onBackToHome && (
          <button
            onClick={onBackToHome}
            className="mt-6 w-full bg-gray-300 hover:bg-gray-400 text-gray-800 px-5 py-2 rounded-lg"
          >
            ⬅ Back
          </button>
        )}
      </div>
    </div>
  );
};

export default IrrigationCard;
