import React, { useState, useEffect } from 'react';
import { DollarSign, TrendingUp, PieChart, Download, Lock, BarChart3, Zap, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigate = useNavigate()

  function handleLogin(){
    navigate('/login')
  }

  const features = [
    {
      icon: <Lock className="w-6 h-6" />,
      title: "Secure Authentication",
      description: "Your financial data is protected with robust user authentication and authorization"
    },
    {
      icon: <DollarSign className="w-6 h-6" />,
      title: "Expense Tracking",
      description: "Effortlessly track and manage all your personal expenses in one place"
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Smart Dashboard",
      description: "View recent expenses and spending patterns at a glance"
    },
    {
      icon: <PieChart className="w-6 h-6" />,
      title: "Reports & Analytics",
      description: "Generate detailed reports to understand your spending habits"
    },
    {
      icon: <Download className="w-6 h-6" />,
      title: "Data Export",
      description: "Export your financial data anytime for your records"
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Responsive Design",
      description: "Access your expenses from any device, anywhere"
    }
  ];

  return (
    <div className="min-h-screen bg-black text-gray-100 overflow-hidden">
      {/* Hero Section */}
      <div className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20">
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.1), transparent 50%), radial-gradient(circle at 80% 20%, rgba(236, 72, 153, 0.1), transparent 50%), radial-gradient(circle at 20% 80%, rgba(34, 211, 238, 0.1), transparent 50%)',
            transform: `translateY(${scrollY * 0.5}px)`
          }}
        />
        
        <div className="relative z-10 mb-16 text-center select-none">
          <h1
            className="
              text-6xl sm:text-7xl md:text-8xl font-extrabold italic tracking-wide
              bg-linear-to-r from-indigo-400 via-pink-400 to-cyan-400
              bg-clip-text text-transparent
              mb-4
              
            "
          >
            Expenza
          </h1>
          <p className="text-lg sm:text-xl text-gray-400 font-light tracking-wide">
            Track Smarter. Spend Wiser.
          </p>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 bg-linear-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Take Control of Your Financial Future
          </h2>
          <p className="text-lg sm:text-xl text-gray-400 mb-12 leading-relaxed">
            A powerful expense management system designed to help you monitor spending habits, 
            generate insightful reports, and maintain better financial control.
          </p>
          
          <div className="flex justify-center items-center">
            <button className="group relative px-8 py-4 bg-linear-to-r from-indigo-500 via-pink-500 to-cyan-500 rounded-full font-semibold text-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-pink-500/50 hover:scale-105"
            onClick={handleLogin}>
              <span className="relative z-10">Get Started Free</span>
              <div className="absolute inset-0 bg-linear-to-r from-cyan-500 via-pink-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </div>
        </div>

        {/* Mock Dashboard Preview */}
        <div className="relative z-10 max-w-5xl mx-auto w-full px-4">
          <div className="relative rounded-2xl overflow-hidden border border-gray-800 shadow-2xl shadow-indigo-500/20 hover:shadow-indigo-500/40 transition-shadow duration-500">
            <div className="absolute inset-0 bg-linear-to-br from-indigo-500/10 via-transparent to-pink-500/10" />
            <div className="relative bg-linear-to-br from-gray-900 to-black p-8">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-linear-to-br from-indigo-500/20 to-indigo-600/5 p-6 rounded-xl border border-indigo-500/30">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400 text-sm">Total Expenses</span>
                    <TrendingUp className="w-5 h-5 text-indigo-400" />
                  </div>
                  <div className="text-3xl font-bold text-white">₹12,458</div>
                </div>
                <div className="bg-linear-to-br from-pink-500/20 to-pink-600/5 p-6 rounded-xl border border-pink-500/30">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400 text-sm">This Month</span>
                    <BarChart3 className="w-5 h-5 text-pink-400" />
                  </div>
                  <div className="text-3xl font-bold text-white">₹3,247</div>
                </div>
                <div className="bg-linear-to-br from-cyan-500/20 to-cyan-600/5 p-6 rounded-xl border border-cyan-500/30">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400 text-sm">Categories</span>
                    <PieChart className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div className="text-3xl font-bold text-white">8</div>
                </div>
              </div>
              <div className="space-y-3">
                {['Groceries - ₹156.43', 'Transportation - ₹89.20', 'Entertainment - ₹234.56'].map((item, i) => (
                  <div key={i} className="bg-gray-800/50 p-4 rounded-lg border border-gray-700/50 hover:border-gray-600 transition-colors">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">{item.split(' - ')[0]}</span>
                      <span className="text-white font-semibold">{item.split(' - ')[1]}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative py-32 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/10 border border-indigo-500/30 rounded-full mb-6">
              <Zap className="w-4 h-4 text-indigo-400" />
              <span className="text-sm text-indigo-400 font-semibold">POWERFUL FEATURES</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-linear-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Everything You Need to Master Your Finances
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Built with powerful tools and intuitive design to make expense management effortless
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative bg-linear-to-br from-gray-900 to-black p-8 rounded-2xl border border-gray-800 hover:border-pink-500/50 transition-all duration-300 hover:transform hover:scale-105"
              >
                <div className="absolute inset-0 bg-linear-to-br from-indigo-500/5 via-pink-500/5 to-cyan-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative">
                  <div className="w-14 h-14 bg-linear-to-br from-indigo-500 to-pink-500 rounded-xl flex items-center justify-center mb-6 group-hover:shadow-lg group-hover:shadow-pink-500/50 transition-shadow">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative py-32 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative bg-linear-to-br from-gray-900 to-black p-12 rounded-3xl border border-gray-800 overflow-hidden">
            <div className="absolute inset-0 bg-linear-to-br from-indigo-500/10 via-pink-500/10 to-cyan-500/10" />
            <div className="relative">
              <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-linear-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Start Your Financial Journey Today
              </h2>
              <p className="text-xl text-gray-400 mb-8">
                Join thousands of users who have taken control of their expenses
              </p>
              <button className="px-10 py-5 bg-linear-to-r from-indigo-500 via-pink-500 to-cyan-500 rounded-full font-bold text-lg hover:shadow-2xl hover:shadow-pink-500/50 transition-all duration-300 hover:scale-105"
              onClick={handleLogin}>
                Create Free Account
              </button>
              <p className="text-sm text-gray-500 mt-4">No credit card required • Free forever</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-900 py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-6">
            <h3 className="text-2xl font-bold italic bg-linear-to-r from-indigo-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              Expenza
            </h3>
          </div>
          <p className="text-gray-500">© 2026 Expenza. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}