import React, { useState } from "react";
import axios from "axios";
import WeatherChart from "./WeatherChart";
import { motion } from "framer-motion";

const Forecast = ({ darkMode }) => {
  const [forecast, setForecast] = useState([]);
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const apiKey = "87e72084b5a88b02dd3cc9a3bcf4de25";

  const getForecast = async () => {
    const trimmedCity = city.trim();
    if (!trimmedCity) {
      alert("Please enter a city name.");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${trimmedCity}&units=metric&appid=${apiKey}`
      );
      const daily = res.data.list.filter((item) => item.dt_txt.includes("12:00:00"));
      setForecast(daily);
    } catch (error) {
      console.error("Forecast fetch error:", error);
      alert("City not found or network issue.");
      setForecast([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`flex-1 bg-white p-6 rounded-3xl shadow-lg transition-all duration-500 ${
        darkMode ? "bg-gray-800 text-gray-100 shadow-gray-700" : "bg-white text-gray-800"
      }`}
    >
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className={`flex-1 p-3 rounded-xl border ${
            darkMode ? "border-gray-600 bg-gray-700 text-gray-100" : "border-gray-300 bg-white text-gray-800"
          } focus:outline-none focus:ring-2 focus:ring-blue-400`}
        />
        <button
          onClick={getForecast}
          disabled={loading}
          className={`px-4 py-2 rounded-xl font-semibold transition-all ${
            loading
              ? "opacity-60 cursor-not-allowed"
              : darkMode
              ? "bg-purple-600 hover:bg-purple-700 text-gray-100"
              : "bg-green-500 hover:bg-green-600 text-white"
          }`}
        >
          {loading ? "Loading..." : "5-Day Forecast"}
        </button>
      </div>

      {forecast.length > 0 && (
        <div>
          <ul className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center text-sm mb-6">
            {forecast.map((item, i) => (
              <li
                key={i}
                className={`p-3 rounded-xl transition-all ${
                  darkMode ? "bg-gray-700 text-gray-100" : "bg-blue-100 text-gray-800"
                }`}
              >
                <p className="font-semibold">
                  {new Date(item.dt_txt).toLocaleDateString(undefined, {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
                <p className="text-lg">🌡️ {item.main.temp}°C</p>
                <p>{item.weather[0].main}</p>
              </li>
            ))}
          </ul>

          <WeatherChart forecast={forecast} darkMode={darkMode} />
        </div>
      )}
    </motion.div>
  );
};

export default Forecast;
