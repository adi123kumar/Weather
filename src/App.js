import React, { useState } from "react";
import CurrentWeather from "./components/CurrentWeather";
import Forecast from "./components/Forecast";
import { motion } from "framer-motion";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div
      className={`min-h-screen p-6 transition-all duration-500 ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gradient-to-br from-blue-100 to-purple-100 text-gray-800"
      }`}
    >
      <div className="flex justify-between items-center max-w-4xl mx-auto mb-6">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold"
        >
          🌦 Weather AI
        </motion.h1>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`px-4 py-2 rounded-full font-semibold transition-colors ${
            darkMode ? "bg-purple-500 text-gray-900" : "bg-blue-400 text-white"
          }`}
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="max-w-4xl mx-auto flex flex-col md:flex-row gap-6"
      >
        <CurrentWeather darkMode={darkMode} />
        <Forecast darkMode={darkMode} />
      </motion.div>
    </div>
  );
}

export default App;
