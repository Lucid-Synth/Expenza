import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [status, setStatus] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("https://expenza-hwdl.onrender.com/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Login failed");

      const data = await response.json();
      localStorage.setItem("authToken", data.token);

      setStatus("success");
      setFormData({ email: "", password: "" });

      setTimeout(() => navigate("/dashboard"), 1000);
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
            bg-linear-to-r from-indigo-400 via-pink-400 to-cyan-400
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
          Welcome Back
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="example@email.com"
              className="w-full rounded-xl bg-[#2a2f3c] border border-[#3b4253] text-gray-100 p-3 focus:ring-2 focus:ring-gray-400 focus:border-gray-400 outline-none transition-all placeholder-gray-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">Password</label>
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

          {/* Submit Button */}
          <button
            type="submit"
            disabled={status === "loading"}
            className={`w-full py-3 rounded-xl font-semibold text-[#0d111a] transition-all ${
              status === "loading"
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-linear-to-r from-gray-200 via-gray-100 to-gray-50 hover:from-gray-100 hover:to-white shadow-[0_0_25px_rgba(255,255,255,0.15)]"
            }`}
          >
            {status === "loading" ? "Logging in..." : "Login"}
          </button>
        </form>

        
        {status === "error" && (
          <p className="text-red-400 text-sm text-center mt-4">
            Invalid credentials. Try again.
          </p>
        )}
        {status === "success" && (
          <p className="text-green-400 text-sm text-center mt-4">
            Login successful!
          </p>
        )}

        <p className="text-center text-sm text-gray-400 mt-6">
          Don’t have an account?{" "}
          <button
            onClick={() => navigate("/register")}
            className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
          >
            Register →
          </button>
        </p>
      </div>
    </div>
  );
}
