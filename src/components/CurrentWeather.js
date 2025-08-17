import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const CurrentWeather = ({ darkMode }) => {
  const [weather, setWeather] = useState(null);
  const [aiAdvice, setAiAdvice] = useState("");
  const [dateTime, setDateTime] = useState("");

  const WEATHER_API_KEY = "87e72084b5a88b02dd3cc9a3bcf4de25";

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const res = await axios.get(
              `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}&units=metric`
            );
            setWeather(res.data);
            setDateTime(getFormattedDateTime());
            generateAIAdvice(res.data.weather[0].description, res.data.main.temp);
          } catch (err) {
            console.error("Location weather error:", err);
          }
        },
        (err) => console.error("Geolocation error:", err)
      );
    }
  }, []);

  const getFormattedDateTime = () => {
    const now = new Date();
    const day = now.toLocaleDateString(undefined, { weekday: "long" });
    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString();
    return `${day}, ${date} - ${time}`;
  };

  const generateAIAdvice = (description, temp) => {
    let tip = "Have a great day!";
    if (description.includes("rain")) tip = "It might rain, carry an umbrella ☔";
    else if (temp > 35) tip = "Stay hydrated! It's really hot ☀️";
    else if (temp < 10) tip = "Wear warm clothes, it's cold 🧥";
    setAiAdvice(tip);
  };

  if (!weather) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`flex-1 bg-white p-6 rounded-3xl shadow-lg transition-all duration-500 ${
        darkMode ? "bg-gray-800 text-gray-100 shadow-gray-700" : "bg-white text-gray-800"
      }`}
    >
      <h2 className="text-2xl font-bold mb-2">📍 {weather.name}</h2>
      <p className="text-sm mb-4">{dateTime}</p>
      <div className="flex flex-col items-center mb-4">
        <p className="text-4xl font-bold mb-1">🌡 {weather.main.temp}°C</p>
        <p className="text-sm">💧 Humidity: {weather.main.humidity}%</p>
        <p className="text-sm">🌥 {weather.weather[0].description}</p>
      </div>
      {aiAdvice && (
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className={`mt-4 p-3 rounded-xl text-sm text-center transition-colors ${
            darkMode ? "bg-purple-700 text-gray-100" : "bg-blue-100 text-gray-800"
          }`}
        >
          <strong>AI Advice:</strong> {aiAdvice}
        </motion.div>
      )}
    </motion.div>
  );
};

export default CurrentWeather;
