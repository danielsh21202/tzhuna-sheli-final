import React, { useState, useEffect } from "react";
import "./styles/global.css";
import { saveData, loadData, clearData } from "./utils/storage";

export default function App() {
  const [meals, setMeals] = useState(() => loadData("meals") || []);
  const [foodInput, setFoodInput] = useState("");
  const [dayIndex, setDayIndex] = useState(() => loadData("dayIndex") || 0);
  const [darkMode, setDarkMode] = useState(() => loadData("darkMode") || false);

  useEffect(() => {
    saveData("meals", meals);
  }, [meals]);

  useEffect(() => {
    saveData("dayIndex", dayIndex);
  }, [dayIndex]);

  useEffect(() => {
    saveData("darkMode", darkMode);
    document.body.className = darkMode ? "dark" : "";
  }, [darkMode]);

  const handleAddMeal = () => {
    if (!foodInput.trim()) return;
    const updated = [...meals];
    if (!updated[dayIndex]) updated[dayIndex] = [];
    updated[dayIndex].push(foodInput.trim());
    setMeals(updated);
    setFoodInput("");
  };

  const handleResetDay = () => {
    const updated = [...meals];
    updated[dayIndex] = [];
    setMeals(updated);
  };

  const handleExport = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      meals.map((day, i) => `יום ${i + 1},"${day?.join(", ") || ""}"`).join("\n");
    const link = document.createElement("a");
    link.href = encodeURI(csvContent);
    link.download = "nutrition-log.csv";
    link.click();
  };

  return (
    <div className="container">
      <h1>תזונה שלי</h1>

      <div className="nav">
        <button onClick={() => setDayIndex((i) => Math.max(i - 1, 0))}>← יום קודם</button>
        <span>יום {dayIndex + 1}</span>
        <button onClick={() => setDayIndex((i) => i + 1)}>יום הבא →</button>
      </div>

      <input
        type="text"
        value={foodInput}
        onChange={(e) => setFoodInput(e.target.value)}
        placeholder="הוסף מאכל/ארוחה"
      />
      <button onClick={handleAddMeal}>➕ הוסף</button>

      <ul className="meal-list">
        {meals[dayIndex]?.map((item, i) => (
          <li key={i}>{item}</li>
        )) || <p>אין נתונים ליום זה.</p>}
      </ul>

      <div className="actions">
        <button onClick={handleResetDay}>🧹 אפס יום</button>
        <button onClick={handleExport}>⬇ ייצוא ל־CSV</button>
        <button onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "☀ מצב רגיל" : "🌙 מצב כהה"}
        </button>
        <button onClick={() => {
          clearData();
          setMeals([]);
          setDayIndex(0);
          setDarkMode(false);
        }}>🔁 אפס הכל</button>
      </div>
    </div>
  );
}
