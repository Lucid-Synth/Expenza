import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [status, setStatus] = useState(null);
  const navigate = useNavigate();

  const AUTH_TOKEN = localStorage.getItem("authToken") || "YOUR_STATIC_TOKEN_HERE";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Registration failed");

      setStatus("success");
      setFormData({ name: "", email: "", password: "" });

      setTimeout(() => navigate("/"), 1500);
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0d111a] px-4 py-10 text-gray-100">
      
      
      <div className="mb-8 text-center select-none">
        <h1
          className="
            text-4xl sm:text-5xl font-extrabold italic tracking-wide
            bg-gradient-to-r from-indigo-400 via-pink-400 to-cyan-400
            bg-clip-text text-transparent
          "
        >
          Expenza
        </h1>
        <p className="text-sm text-gray-400 mt-1">Track Smarter. Spend Wiser.</p>
      </div>

      <div
        className="
          w-full max-w-md rounded-2xl p-6 sm:p-8 
          bg-[#1a1f2b] border border-[#2a3142] 
          shadow-[0_8px_25px_rgba(0,0,0,0.5)]
          hover:shadow-[0_10px_35px_rgba(255,255,255,0.1)]
          transition-all duration-300
        "
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-100 mb-6 text-center">
          Create Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">

          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="e.g. John Doe"
              className="w-full rounded-xl bg-[#2a2f3c] border border-[#3b4253] text-gray-100 p-3 focus:ring-2 focus:ring-gray-400 focus:border-gray-400 outline-none transition-all placeholder-gray-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="e.g. example@email.com"
              className="w-full rounded-xl bg-[#2a2f3c] border border-[#3b4253] text-gray-100 p-3 focus:ring-2 focus:ring-gray-400 focus:border-gray-400 outline-none transition-all placeholder-gray-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="••••••••"
              className="w-full rounded-xl bg-[#2a2f3c] border border-[#3b4253] text-gray-100 p-3 focus:ring-2 focus:ring-gray-400 focus:border-gray-400 outline-none transition-all placeholder-gray-500"
            />
          </div>

          <button
            type="submit"
            disabled={status === "loading"}
            className={`w-full py-3 rounded-xl font-semibold text-[#0d111a] transition-all 
              ${
                status === "loading"
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-gray-200 via-gray-100 to-gray-50 hover:from-gray-100 hover:to-white shadow-[0_0_25px_rgba(255,255,255,0.15)]"
              }`}
          >
            {status === "loading" ? "Registering..." : "Register"}
          </button>
        </form>

        {status === "success" && (
          <p className="text-green-400 text-sm text-center mt-4">
            Registration successful! Redirecting...
          </p>
        )}
        {status === "error" && (
          <p className="text-red-400 text-sm text-center mt-4">
            Something went wrong. Please try again.
          </p>
        )}
      </div>
    </div>
  );
}
