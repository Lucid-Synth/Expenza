import React, { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";

export default function RealisticExpenseCard() {
  const [monthlyData, setMonthlyData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("All");
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(null);
  const [userName, setUserName] = useState("...");

  // Get token and fetch data
  useEffect(() => {
    const savedToken = localStorage.getItem("authToken");
    if (!savedToken) {
      setError("No token found. Please log in.");
      setLoading(false);
      return;
    }
    setToken(savedToken);
    fetchUserData(savedToken);
    fetchMonthlyData(savedToken);
  }, []);

  // 🔹 Fetch user profile/name
  const fetchUserData = async (authToken) => {
    try {
      const response = await fetch("http://localhost:3000/api/auth/profile", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (!response.ok) throw new Error("Failed to fetch user data");

      const data = await response.json();
      setUserName(data.name || "Unknown User");
    } catch (err) {
      console.error("User fetch error:", err);
      setUserName("Guest");
    }
  };

  // 🔹 Fetch monthly expense data
  const fetchMonthlyData = async (authToken) => {
    try {
      const response = await fetch("http://localhost:3000/api/reports/monthly", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (!response.ok) throw new Error("Failed to fetch monthly report");

      const data = await response.json();
      setMonthlyData(data);

      // Default total for "All" months
      const sum = data.reduce((acc, item) => acc + item.total, 0);
      setTotalExpenses(sum);
    } catch (err) {
      console.error(err);
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Handle month selection
  const handleMonthChange = (e) => {
    const month = e.target.value;
    setSelectedMonth(month);

    if (month === "All") {
      const sum = monthlyData.reduce((acc, item) => acc + item.total, 0);
      setTotalExpenses(sum);
    } else {
      const selected = monthlyData.find((item) => item.month === month);
      setTotalExpenses(selected ? selected.total : 0);
    }
  };

  return (
    <div className="relative flex justify-center w-full flex-col items-center gap-4">
      {/* Month dropdown */}
      <select
        value={selectedMonth}
        onChange={handleMonthChange}
        className="rounded-xl bg-[#1c2230] border border-[#2a3142] text-gray-100 p-2 focus:ring-2 focus:ring-gray-400 outline-none"
      >
        <option value="All">All Months</option>
        {monthlyData.map((item) => (
          <option key={item.month} value={item.month}>
            {item.month}
          </option>
        ))}
      </select>

      {/* Expense Card */}
      <div
        className="
          rounded-2xl relative transition-transform duration-300 hover:scale-[1.02]
          w-[90%] sm:w-[380px] md:w-[460px] lg:w-[520px]
          aspect-video
        "
        style={{
          background:
            "linear-gradient(135deg, #1a1f2b 0%, #2a2f3c 50%, #1a1f2b 100%)",
          boxShadow:
            "0 20px 60px rgba(0, 0, 0, 0.4), 0 10px 20px rgba(0, 0, 0, 0.2)",
        }}
      >
        <div
          className="absolute inset-0 rounded-2xl opacity-10"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
            mixBlendMode: "overlay",
          }}
        />

        {/* Card Content */}
        <div className="relative h-full p-4 sm:p-5 flex flex-col justify-between text-gray-100">
          <div className="text-base sm:text-lg font-semibold tracking-wide">
            Total Expenses
          </div>

          <div className="flex items-center justify-center flex-1">
            {loading ? (
              <Loader2 className="animate-spin text-gray-300" size={40} />
            ) : error ? (
              <div className="text-red-400 text-lg font-semibold">Error</div>
            ) : (
              <div className="text-3xl sm:text-5xl font-bold text-white tracking-wider">
                ₹{totalExpenses}
              </div>
            )}
          </div>

          <div className="flex justify-between items-end text-[10px] sm:text-xs">
            <div>
              <div className="text-gray-400 mb-1 font-black">NAME</div>
              <div className="font-semibold tracking-wider">{userName}</div>
            </div>
            <div>
              <div className="text-gray-400 mb-1 font-black">MONTH</div>
              <div className="font-semibold tracking-wider">
                {selectedMonth}
              </div>
            </div>
          </div>
        </div>

        {/* Animated Shine */}
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            background:
              "linear-gradient(110deg, transparent 30%, rgba(255,255,255,0.08) 50%, transparent 70%)",
            backgroundSize: "200% 100%",
            animation: "gradientFlow 15s ease infinite",
          }}
        />
      </div>

      <div
        className="absolute -bottom-2 left-4 right-4 h-3 rounded-full blur-lg"
        style={{
          background:
            "radial-gradient(ellipse, rgba(0,0,0,0.5) 0%, transparent 70%)",
        }}
      />

      <style jsx>{`
        @keyframes gradientFlow {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 50% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </div>
  );
}
