import React from "react";
import { getRecommendation, severityLabel } from "./diagnosisHelpers";

export default function FieldCard({ file, diagnosis }) {
  // If no file uploaded yet — DO NOT ACCESS file.name
  if (!file) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold text-green-700 mb-2">
          Analysis Result
        </h2>
        <p className="text-gray-600">Upload a crop image to begin diagnosis.</p>
      </div>
    );
  }

  // If file exists but diagnosis is not ready yet
  if (!diagnosis) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold text-green-700 mb-2">
          Analysis In Progress
        </h2>
        <p className="text-gray-700">
          <strong>File:</strong> {file.name}
        </p>
        <p className="text-gray-600 mt-2">Click “Run Diagnosis” to analyze.</p>
      </div>
    );
  }
  // diagnosis = { prediction: "...", confidence: 0.xx }
  const { prediction, confidence } = diagnosis;
  const isHealthy = prediction.toLowerCase().includes("healthy");
  const confPct = (confidence * 100).toFixed(1);
  const severity = severityLabel(confidence);
  const rec = getRecommendation(prediction);

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold text-green-700 mb-2">
        Analysis Result
      </h2>

      <p className="text-lg font-bold">
        Status:{" "}
        <span className={isHealthy ? "text-green-600" : "text-red-600"}>
          {isHealthy ? "Healthy 🌿" : "Infected ❌"}
        </span>
      </p>

      {!isHealthy && (
        <>
          <p className="mt-2">
            <strong>Disease:</strong> {prediction}
          </p>
          <p>
            <strong>Confidence:</strong> {confPct}%
          </p>
          <p>
            <strong>Severity:</strong> {severity}
          </p>

          <div className="mt-4 p-4 bg-green-50 rounded">
            <h4 className="font-semibold">Recommendation</h4>
            <p className="text-sm mt-2">{rec}</p>

            <div className="mt-3 text-sm text-gray-700">
              <p>
                <strong>Estimated precision spray cost:</strong> ₹10
              </p>
              <p>
                <strong>Estimated savings vs blanket spray:</strong> ₹240
              </p>
            </div>
          </div>
        </>
      )}

      {isHealthy && (
        <div className="mt-3 p-3 bg-green-100 rounded">
          <h4>Prediction: {prediction}</h4>
          <p>Confidence: {confPct}%</p>

          <p>No action required. Continue monitoring.</p>
        </div>
      )}
    </div>
  );
}
