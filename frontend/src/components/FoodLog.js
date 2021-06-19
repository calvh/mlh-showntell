import React, { useState, useEffect } from "react";

export default function FoodLog() {
  const [foods, setFoods] = useState([]);
  const [entries, setEntries] = useState([]);
  const [foodName, setFoodName] = useState("");
  const [foodServing, setFoodServing] = useState("");
  const [foodCalories, setFoodCalories] = useState(0);
  const [foodQuantity, setFoodQuantity] = useState(1);
  const [foodId, setFoodId] = useState();

  useEffect(() => {
    async function fetchFoods() {
      try {
        const foodData = await (
          await fetch("/api/foods/", {
            method: "GET",
          })
        ).json();
        setFoods(foodData);
      } catch (error) {
        console.log(error);
      }
    }
    fetchFoods();
  }, []);

  useEffect(() => {
    async function fetchEntries() {
      try {
        const entryData = await (await fetch("/api/entries/")).json();
        setEntries(entryData);
      } catch (error) {
        console.log(error);
      }
    }
    fetchEntries();
  }, []);

  const handleNewFoodSubmit = (event) => {
    event.preventDefault();

    // handle invalid input
    if (!foodName || !foodServing || foodCalories < 0) {
      return;
    }

    async function postFood() {
      try {
        const postFoodResult = await (
          await fetch("/api/foods/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: foodName,
              serving: foodServing,
              calories: foodCalories,
            }),
          })
        ).json();
        setFoods([...foods, postFoodResult]);
      } catch (error) {
        console.log(error);
      }
    }
    postFood();
  };

  const handleNewEntrySubmit = (event) => {
    event.preventDefault();
    if (!foodId || !foodQuantity) {
      return;
    }
    async function postEntry() {
      try {
        const postEntryResult = await (
          await fetch("/api/entries/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              food: foodId,
              quantity: foodQuantity,
            }),
          })
        ).json();
        setEntries([...entries, postEntryResult]);
      } catch (error) {
        console.log(error);
      }
    }
    postEntry();
  };

  return (
    <div id="food-log">
      {foods.length > 0 ? (
        <div>
          <ul>
            {foods.map((food) => (
              <li key={food.id}>
                {`${food.id}: ${food.name}, ${food.serving}, ${food.calories} calories`}{" "}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div>No foods!</div>
      )}
      <div>
        <form onSubmit={handleNewFoodSubmit}>
          <input
            value={foodName}
            onChange={(event) => setFoodName(event.target.value.trim())}
            type="text"
            placeholder="Enter food name."
            required
          ></input>
          <input
            value={foodServing}
            onChange={(event) => setFoodServing(event.target.value.trim())}
            type="text"
            placeholder="Enter food serving."
            required
          ></input>
          <label for="food-calories">Calories</label>
          <input
            id="food-calories"
            value={foodCalories}
            onChange={(event) => setFoodCalories(event.target.value)}
            type="number"
            step="1"
            min="0"
            placeholder="0"
            required
          ></input>
          <button type="submit">Add new food</button>
        </form>
      </div>

      {entries.length > 0 ? (
        <div>
          <ol>
            {entries.map((entry) => (
              <li
                key={entry.id}
              >{`Food ${entry.food_id} x ${entry.quantity} @ ${entry.entry_time}`}</li>
            ))}
          </ol>
        </div>
      ) : (
        <div>No entries!</div>
      )}
      <div>
        <form onSubmit={handleNewEntrySubmit}>
          <label for="food-id">Food ID</label>
          <input
            id="food-id"
            value={foodId}
            onChange={(event) => setFoodId(event.target.value)}
            type="number"
            step="1"
            min="1"
            required
          ></input>
          <label for="food-quantity">Quantity</label>
          <input
            id="food-quantity"
            value={foodQuantity}
            onChange={(event) => setFoodQuantity(event.target.value)}
            type="number"
            step="1"
            min="1"
            required
          ></input>
          <button>New Entry</button>
        </form>
      </div>
    </div>
  );
}
