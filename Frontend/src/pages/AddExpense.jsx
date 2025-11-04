import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";

export default function AddExpense() {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    amount: "",
    date: "",
    description: "",
  });

  const [status, setStatus] = useState(null);
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedToken = localStorage.getItem("authToken");
    if (!savedToken) {
      setStatus("noToken");
      navigate("/login");
    } else {
      setToken(savedToken);
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("http://localhost:3000/api/expenses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to add expense");

      setStatus("success");
      setFormData({
        title: "",
        category: "",
        amount: "",
        date: "",
        description: "",
      });
      navigate('/dashboard')
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  const handleClose = () => {
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#0d111a] flex items-center justify-center px-4 py-10 text-gray-100">
      <div
        className="relative w-full max-w-lg rounded-2xl p-8 shadow-[0_10px_40px_rgba(255,255,255,0.1)] backdrop-blur-lg border border-[#2a3142]"
        style={{
          background:
            "linear-gradient(145deg, rgba(45,45,45,0.9), rgba(15,15,15,0.95))",
        }}
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-200 transition"
          aria-label="Close"
        >
          <X size={22} />
        </button>

        <h2 className="text-2xl font-bold text-gray-100 mb-6 text-center">
          Add New Expense
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="e.g. Grocery Shopping"
              className="w-full rounded-xl bg-[#1e1e1e] border border-gray-700 text-gray-100 p-3 focus:ring-2 focus:ring-gray-400 outline-none transition-all placeholder-gray-500"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full rounded-xl bg-[#1e1e1e] border border-gray-700 text-gray-100 p-3 focus:ring-2 focus:ring-gray-400 outline-none transition-all"
            >
              <option value="">Select Category</option>
              <option value="Shopping">Shopping</option>
              <option value="Food">Food</option>
              <option value="Travel">Travel</option>
              <option value="Bills">Bills</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Others">Others</option>
            </select>
          </div>

          {/* Amount */}
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Amount (₹)
            </label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              required
              placeholder="e.g. 1200"
              className="w-full rounded-xl bg-[#1e1e1e] border border-gray-700 text-gray-100 p-3 focus:ring-2 focus:ring-gray-400 outline-none transition-all placeholder-gray-500"
            />
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Date
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="w-full rounded-xl bg-[#1e1e1e] border border-gray-700 text-gray-100 p-3 focus:ring-2 focus:ring-gray-400 outline-none transition-all"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              className="w-full rounded-xl bg-[#1e1e1e] border border-gray-700 text-gray-100 p-3 focus:ring-2 focus:ring-gray-400 outline-none transition-all placeholder-gray-500"
              placeholder="Short description (optional)"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={status === "loading"}
            className={`w-full py-3 rounded-xl font-semibold text-[#0d111a] transition-all ${
              status === "loading"
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-linear-to-r from-gray-200 via-gray-100 to-gray-50 hover:from-gray-100 hover:to-white shadow-[0_0_25px_rgba(255,255,255,0.15)]"
            }`}
          >
            {status === "loading" ? "Adding..." : "Add Expense"}
          </button>
        </form>

        {status === "success" && (
          <p className="text-green-400 text-sm text-center mt-4">
            Expense added successfully!
          </p>
        )}
        {status === "error" && (
          <p className="text-red-400 text-sm text-center mt-4">
            Failed to add expense. Try again.
          </p>
        )}
        {status === "noToken" && (
          <p className="text-yellow-400 text-sm text-center mt-4">
            No token found — please log in again.
          </p>
        )}
      </div>
    </div>
  );
}
