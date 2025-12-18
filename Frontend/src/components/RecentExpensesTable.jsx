import React, { useState, useEffect } from "react";
import { Trash } from "lucide-react";

export default function RecentExpensesTable() {
  const [recentExpenses, setRecentExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const savedToken = localStorage.getItem("authToken");

    if (!savedToken) {
      setError("No token found. Please login.");
      setLoading(false);
      return;
    }

    setToken(savedToken);
    fetchExpenses(savedToken);
  }, []);

  const fetchExpenses = async (authToken) => {
    try {
      const response = await fetch(
        "https://expenza-hwdl.onrender.com/api/expenses",
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch expenses");
      }

      const data = await response.json();
      setRecentExpenses(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteExpenses = async (id) => {
  if (!token) return;

  const previousExpenses = recentExpenses;
  setRecentExpenses((prev) =>
    prev.filter((expense) => expense._id !== id)
  );

  try {
    const response = await fetch(
      `https://expenza-hwdl.onrender.com/api/expenses/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Delete failed");
    }
    // Notify other components with deleted expense details for immediate UI update
    const deleted = previousExpenses.find((exp) => exp._id === id);
    window.dispatchEvent(
      new CustomEvent("expenseDeleted", {
        detail: { amount: deleted ? Number(deleted.amount) : 0, date: deleted ? deleted.date : null },
      })
    );
  } catch (error) {
    console.error("Delete failed, rolling back", error);
    setRecentExpenses(previousExpenses);
  }
};


  if (loading) return <p className="text-gray-100 text-center mt-10">Loading...</p>;
  if (error) return <p className="text-red-400 text-center mt-10">{error}</p>;

  return (
    <div className="w-full max-w-6xl mx-auto px-3 sm:px-4">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-100 mb-6">
        Recent Expenses
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {recentExpenses.map((expense) => (
          <div
            key={expense._id}
            className="bg-[#1c2230] border border-[#2a3142] rounded-2xl p-5"
          >
            <div className="flex justify-between mb-3">
              <h3 className="font-semibold text-gray-100">
                {expense.title}
              </h3>
              <span className="text-sm text-gray-300">
                {expense.category}
              </span>
            </div>

            <div className="text-2xl font-bold text-gray-100 mb-3">
              ₹{expense.amount}
            </div>

            <p className="text-gray-400 text-sm mb-6">
              {expense.description}
            </p>

            <div className="flex justify-between text-xs text-gray-500">
              <span>
                {new Date(expense.date).toLocaleDateString("en-IN")}
              </span>
              <button onClick={() => deleteExpenses(expense._id)}>
                <Trash color="#a31f1f" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
