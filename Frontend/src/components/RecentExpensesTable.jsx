import React, { useState, useEffect } from "react";

export default function RecentExpensesTable() {
  const [recentExpenses, setRecentExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Get token from localStorage
    const savedToken = localStorage.getItem("authToken");
    if (savedToken) {
      setToken(savedToken);
      fetchExpenses(savedToken);
    } else {
      setError("No token found. Please login.");
      setLoading(false);
    }
  }, []);

  const fetchExpenses = async (authToken) => {
    try {
      const response = await fetch("https://expenza-hwdl.onrender.com/api/expenses", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch expenses");
      }

      const data = await response.json();
      console.log(data)
      setRecentExpenses(data);
    } catch (err) {
      console.error(err);
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="text-gray-100 text-center mt-10">Loading...</p>;
  if (error) return <p className="text-red-400 text-center mt-10">{error}</p>;

  return (
    <div className="w-full max-w-6xl mx-auto px-3 sm:px-4">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-100 mb-6 text-center md:text-left">
        Recent Expenses
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {recentExpenses.map((expense) => (
          <div
            key={expense.id}
            className="
              bg-[#1c2230] border border-[#2a3142] 
              rounded-2xl p-4 sm:p-5 
              shadow-[0_8px_25px_rgba(0,0,0,0.3)] 
              hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] 
              transition-all duration-300 
              hover:-translate-y-1
            "
          >

            <div className="flex justify-between items-center mb-3">
              <h3 className="text-base sm:text-lg font-semibold text-gray-100 truncate">
                {expense.title}
              </h3>
              <span className="text-[10px] sm:text-sm font-bold text-gray-300 bg-[#2b3345] px-2 py-1 rounded-md">
                {expense.category}
              </span>
            </div>

            <div className="text-xl sm:text-2xl font-bold text-gray-100 mb-3">
              ₹{expense.amount}
            </div>
            
            <p className="text-gray-400 text-xs sm:text-sm mb-4 line-clamp-2">
              {expense.description}
            </p>

            <div className="flex justify-between items-center text-[10px] sm:text-xs text-gray-500">
              <span></span>
              <span>{expense.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
