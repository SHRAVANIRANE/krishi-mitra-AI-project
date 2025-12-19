import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div
      className="w-1/6 min-h-screen bg-white shadow-md p-6 space-y-6 text-green-700 text-lg shadow-md
"
    >
      <Link
        to="/dashboard"
        className="block hover:bg-green-700 rounded px-2 py-3  text-green-800 hover:text-white transition"
      >
        📊 Dashboard
      </Link>

      <Link
        to="/weather"
        className="block hover:bg-green-700 rounded px-2 py-3  text-green-800 hover:text-white transition"
      >
        🌦️ Weather Prediction
      </Link>

      <Link
        to="/crop-health"
        className="block hover:bg-green-700 rounded px-2 py-3  text-green-800 hover:text-white transition"
      >
        🩺 Crop Health
      </Link>

      <Link
        to="/irrigation"
        className="block hover:bg-green-700 rounded px-2 py-3 text-green-800 hover:text-white transition"
      >
        💧 Irrigation Advisor
      </Link>
    </div>
  );
}

export default Sidebar;
