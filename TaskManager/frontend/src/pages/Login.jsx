import React, { useState, useEffect } from "react";
import axios from "axios";
import { Eye, EyeOff, Layers } from "lucide-react";
import toast from "react-hot-toast";

const Login = () => {
  useEffect(() => {
    document.title = "Login | FocusFlow";
  }, []);

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("All fields are required");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/auth/login`,
        { email, password }
      );

      toast.success("Welcome back 👋");
      localStorage.setItem("todotoken", res.data.todotoken);
      window.location.replace("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-teal-50 px-4">
      {/* Background Glow */}
      <div className="absolute w-[600px] h-[600px] bg-teal-400/20 rounded-full blur-[200px]" />

      <div className="relative w-full max-w-md rounded-2xl bg-white/80 backdrop-blur border border-slate-200 shadow-xl px-8 py-10">
        {/* Brand */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-600 to-teal-500 text-white flex items-center justify-center shadow-md mb-3">
            <Layers size={22} />
          </div>
          <h1 className="text-2xl font-semibold text-slate-800">
            Welcome back
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Login to continue to FocusFlow
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Email address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="
                w-full px-4 py-2.5 rounded-lg
                border border-slate-300
                bg-white
                focus:outline-none
                focus:ring-2 focus:ring-teal-500
                transition
              "
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="
                  w-full px-4 py-2.5 pr-11 rounded-lg
                  border border-slate-300
                  bg-white
                  focus:outline-none
                  focus:ring-2 focus:ring-teal-500
                  transition
                "
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-teal-600 transition"
              >
                {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
            </div>

            
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="
              w-full mt-4
              py-2.5 rounded-xl
              bg-teal-600 text-white
              font-semibold
              shadow-lg shadow-teal-500/30
              hover:bg-teal-700
              hover:-translate-y-0.5
              transition-all duration-300
              disabled:opacity-60
              disabled:cursor-not-allowed
            "
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-slate-600 mt-6">
          Don’t have an account?{" "}
          <a
            href="/register"
            className="text-teal-600 font-medium hover:underline"
          >
            Create one
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
