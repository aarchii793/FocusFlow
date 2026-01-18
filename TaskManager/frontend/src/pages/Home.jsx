import { ArrowRight, Layers } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  useEffect(() => {
    document.title = "FocusFlow | Stay Focused";
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-white to-teal-50 text-slate-900">
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 w-full z-50">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-600 to-teal-500 text-white flex items-center justify-center shadow">
              <Layers size={18} />
            </div>
            <span className="font-semibold text-lg tracking-tight">
              FocusFlow
            </span>
          </div>

          {/* Auth Links */}
          <div className="flex items-center gap-4">
            <Link
              to="/login"
              className="text-sm font-medium text-slate-700 hover:text-teal-600 transition"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="
                px-5 py-2 rounded-xl
                bg-teal-600 text-white
                text-sm font-medium
                hover:bg-teal-700
                shadow-lg shadow-teal-500/30
                transition-all duration-300
              "
            >
              Register
            </Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <main className="flex-1 flex items-center justify-center relative overflow-hidden pt-32">
        {/* Background glow */}
        <div className="absolute w-[700px] h-[700px] bg-teal-400/20 rounded-full blur-[200px]" />

        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <span className="inline-flex items-center gap-2 mb-6 rounded-full bg-teal-100 px-4 py-1.5 text-xs font-semibold text-teal-700">
            ✨ Built for deep focus
          </span>

          <h1 className="text-4xl md:text-6xl font-semibold leading-tight">
            Focus on what matters.
            <br />
            <span className="text-teal-600">
              Let FocusFlow organize the rest.
            </span>
          </h1>

          <p className="mt-6 text-slate-600 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            FocusFlow is a distraction-free task manager designed to help you
            plan smarter, work faster, and finish what you start.
          </p>

          {/* CTA Buttons */}
          <div className="mt-12 flex flex-wrap justify-center gap-6">
            {/* Primary CTA */}
            <Link
              to="/register"
              className="
                inline-flex items-center gap-2
                px-10 py-3.5
                rounded-xl
                bg-teal-600 text-white
                text-base font-semibold
                shadow-xl shadow-teal-500/30
                hover:bg-teal-700
                hover:-translate-y-0.5
                transition-all duration-300
              "
            >
              Get Started Free
              <ArrowRight size={18} />
            </Link>

            {/* Secondary CTA */}
            <Link
              to="/login"
              className="
                px-10 py-3.5
                rounded-xl
                border border-slate-300
                text-base font-semibold
                text-slate-700
                hover:bg-slate-100
                hover:border-slate-400
                transition-all duration-300
              "
            >
              Login
            </Link>
          </div>

          {/* Trust line */}
          
        </div>
      </main>

      
    </div>
  );
};

export default Home;
