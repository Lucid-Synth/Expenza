import React, { useState, useEffect, useRef } from "react";
import { ChevronDown, FileDown, FileText, Menu, X } from "lucide-react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);
  const exportRef = useRef(null);

  // ✅ Close dropdown when clicking anywhere outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (exportRef.current && !exportRef.current.contains(event.target)) {
        setExportOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ✅ Export function with auth token
  const handleExport = async (type) => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      alert("You must be logged in to export files.");
      return;
    }

    try {
      const response = await fetch(`https://expenza-hwdl.onrender.com/api/export/${type}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to export file.");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `expenses.${type === "pdf" ? "pdf" : "csv"}`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
      setExportOpen(false);
    } catch (err) {
      console.error("Export Error:", err);
      alert("Error exporting file: " + err.message);
    }
  };

  return (
    <nav
      className="
        w-screen z-50
        bg-gradient-to-r from-[#1a1f2b] via-[#2a2f3c] to-[#1a1f2b]
        shadow-lg
        border-b border-[#2a3142]
        text-gray-100
      "
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center relative">
          {/* --- Logo --- */}
          <div className="flex-shrink-0">
            <h1
              className="
                text-2xl sm:text-3xl font-extrabold italic tracking-wide
                bg-gradient-to-r from-indigo-400 via-pink-400 to-cyan-400
                bg-clip-text text-transparent select-none
              "
            >
              Expenza
            </h1>
          </div>

          {/* --- Desktop Navigation --- */}
          <div className="hidden md:flex items-center space-x-6">
            <a
              href="/add"
              className="
                text-sm font-medium tracking-wide
                hover:text-white transition-colors
              "
            >
              Add Expenses
            </a>

            <div className="relative" ref={exportRef}>
              <button
                onClick={() => setExportOpen(!exportOpen)}
                className="
                  flex items-center gap-1 px-3 py-2 text-sm font-medium
                  bg-[#232a39] hover:bg-[#2f3649]
                  rounded-xl border border-[#3a4255]
                  transition-all
                "
              >
                Export
                <ChevronDown size={16} className="ml-1" />
              </button>

              {exportOpen && (
                <div
                  className="
                    absolute right-0 mt-2 w-32 bg-[#1c2230]
                    border border-[#2a3142]
                    rounded-xl shadow-xl overflow-hidden
                  "
                >
                  <button
                    onClick={() => handleExport("pdf")}
                    className="
                      flex items-center gap-2 px-4 py-2 text-sm w-full text-left
                      hover:bg-[#2a3142] transition
                    "
                  >
                    <FileText size={16} /> PDF
                  </button>
                  <button
                    onClick={() => handleExport("csv")}
                    className="
                      flex items-center gap-2 px-4 py-2 text-sm w-full text-left
                      hover:bg-[#2a3142] transition
                    "
                  >
                    <FileDown size={16} /> CSV
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* --- Mobile Menu Button --- */}
          <button
            className="md:hidden text-gray-200 hover:text-white"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* --- Mobile Menu --- */}
      {menuOpen && (
        <div className="md:hidden bg-[#1c2230] border-t border-[#2a3142]">
          <a
            href="/add"
            className="
              block px-4 py-3 text-sm font-medium
              hover:bg-[#2a3142] transition
            "
          >
            Add Expenses
          </a>

          <div className="border-t border-[#2a3142]" />

          <div className="relative" ref={exportRef}>
            <button
              onClick={() => setExportOpen(!exportOpen)}
              className="
                w-full text-left px-4 py-3 text-sm font-medium flex items-center justify-between
                hover:bg-[#2a3142]
              "
            >
              <span>Export</span>
              <ChevronDown size={16} />
            </button>

            {exportOpen && (
              <div className="bg-[#232a39] border-t border-[#2a3142]">
                <button
                  onClick={() => handleExport("pdf")}
                  className="flex items-center gap-2 px-6 py-2 text-sm w-full text-left hover:bg-[#2a3142]"
                >
                  <FileText size={16} /> PDF
                </button>
                <button
                  onClick={() => handleExport("csv")}
                  className="flex items-center gap-2 px-6 py-2 text-sm w-full text-left hover:bg-[#2a3142]"
                >
                  <FileDown size={16} /> CSV
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
