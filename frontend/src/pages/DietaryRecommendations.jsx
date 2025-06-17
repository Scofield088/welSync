import { useState } from "react";
import axios from "axios";

export default function DietaryRecommendations() {
  const [mealType, setMealType] = useState("breakfast");
  const [mealKind, setMealKind] = useState("solid");
  const [healthCondition, setHealthCondition] = useState("");
  const [protein, setProtein] = useState("");
  const [vitamins, setVitamins] = useState("");
  const [carbs, setCarbs] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [response, setResponse] = useState("");

  const GEMINI_API_KEY = "YOUR_GEMINI_API_KEY"; // Replace with a valid API key

  const fetchDietPlan = async () => {
    const prompt = `
      You are a professional nutritionist. Suggest a meal plan for a person with ${healthCondition}.
      - Meal Type: ${mealType}
      - Solid/Liquid: ${mealKind}
      - Protein Needs: ${protein}g
      - Vitamins Needed: ${vitamins}
      - Carbohydrates Needed: ${carbs}g
      Suggest a full-day diet plan with breakfast, lunch, dinner, and snacks.
    `;

    try {
      const { data } = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateText?key=${GEMINI_API_KEY}`,
        { prompt }
      );
      setResponse(data?.candidates?.[0]?.output || "No data received.");
    } catch (error) {
      console.error("Error fetching data:", error);
      setResponse("Failed to generate recommendations. Try again.");
    }
  };

  const fetchRecipeSuggestions = async () => {
    const prompt = `
      Suggest healthy recipes using these ingredients: ${ingredients}.
      The recipes should be suitable for someone with ${healthCondition}.
    `;

    try {
      const { data } = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateText?key=${GEMINI_API_KEY}`,
        { prompt }
      );
      setResponse(data?.candidates?.[0]?.output || "No data received.");
    } catch (error) {
      console.error("Error fetching data:", error);
      setResponse("Failed to generate recipes. Try again.");
    }
  };

  return (
    <div className="bg-black text-white min-h-screen p-6">
      <h1 className="text-3xl font-bold text-green-400 text-center mb-4">🍏 Dietary Recommendations 🍎</h1>

      {/* Meal & Health Condition */}
      <div className="bg-gray-900 p-4 rounded-lg shadow-lg mb-6">
        <h2 className="text-xl text-yellow-300 mb-2">🛠 Input Meal & Health Condition</h2>
        <div className="flex flex-wrap gap-4">
          <select className="p-2 bg-gray-800 border border-green-400 rounded" value={mealType} onChange={(e) => setMealType(e.target.value)}>
            <option value="breakfast">Breakfast</option>
            <option value="lunch">Lunch</option>
            <option value="dinner">Dinner</option>
            <option value="snack">Snack</option>
          </select>
          <select className="p-2 bg-gray-800 border border-green-400 rounded" value={mealKind} onChange={(e) => setMealKind(e.target.value)}>
            <option value="solid">Solid</option>
            <option value="liquid">Liquid</option>
          </select>
          <input
            type="text"
            placeholder="Enter Health Condition (e.g., Diabetes)"
            className="p-2 bg-gray-800 border border-red-400 rounded w-full"
            value={healthCondition}
            onChange={(e) => setHealthCondition(e.target.value)}
          />
        </div>
      </div>

      {/* Nutritional Needs */}
      <div className="bg-gray-900 p-4 rounded-lg shadow-lg mb-6">
        <h2 className="text-xl text-yellow-300 mb-2">🥦 Enter Nutritional Needs</h2>
        <div className="flex flex-wrap gap-4">
          <input type="text" placeholder="Protein (g)" className="p-2 bg-gray-800 border border-blue-400 rounded" value={protein} onChange={(e) => setProtein(e.target.value)} />
          <input type="text" placeholder="Vitamins (A,B,C...)" className="p-2 bg-gray-800 border border-yellow-400 rounded" value={vitamins} onChange={(e) => setVitamins(e.target.value)} />
          <input type="text" placeholder="Carbohydrates (g)" className="p-2 bg-gray-800 border border-orange-400 rounded" value={carbs} onChange={(e) => setCarbs(e.target.value)} />
        </div>
        <button className="mt-4 bg-green-500 text-black font-bold py-2 px-4 rounded hover:bg-green-600" onClick={fetchDietPlan}>
          Generate Diet Plan
        </button>
      </div>

      {/* Recipe Suggestions */}
      <div className="bg-gray-900 p-4 rounded-lg shadow-lg mb-6">
        <h2 className="text-xl text-yellow-300 mb-2">🍲 Enter Ingredients for Recipes</h2>
        <input
          type="text"
          placeholder="Enter ingredients (comma-separated)"
          className="p-2 bg-gray-800 border border-pink-400 rounded w-full"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
        />
        <button className="mt-4 bg-orange-500 text-black font-bold py-2 px-4 rounded hover:bg-orange-600" onClick={fetchRecipeSuggestions}>
          Get Recipe Suggestions
        </button>
      </div>

      {/* Response Section */}
      {response && (
        <div className="bg-gray-800 p-4 rounded-lg mt-4">
          <h3 className="text-green-400 font-bold text-lg">🍽️ Recommended Plan:</h3>
          <p className="mt-2 text-white">{response}</p>
        </div>
      )}
    </div>
  );
}
