import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  CheckCircle2,
  Clock,
  AlertCircle,
  Plus,
  LogOut,
  Layers,
  Menu,
  X,
} from "lucide-react";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const navItems = [
    { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { label: "Completed", path: "/tasks/completed", icon: CheckCircle2 },
    { label: "Pending", path: "/tasks/pending", icon: Clock },
    { label: "In Progress", path: "/tasks/incomplete", icon: AlertCircle },
  ];

  const isActive = (path) =>
    location.pathname === path
      ? "bg-teal-600 text-white shadow-sm"
      : "text-slate-600 hover:bg-slate-100";

  return (
    <>
      {/* Mobile Top Bar */}
      <header className="md:hidden flex items-center justify-between px-4 py-3 border-b bg-white/80 backdrop-blur">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-teal-600 to-teal-500 flex items-center justify-center text-white shadow">
            <Layers size={18} />
          </div>
          <span className="font-semibold text-slate-900 tracking-tight">
            FocusFlow
          </span>
        </div>

        <button
          onClick={() => setOpen(true)}
          className="p-2 rounded-md hover:bg-slate-100 transition"
        >
          <Menu size={22} />
        </button>
      </header>

      {/* Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200
        transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <div className="flex h-full flex-col">
          {/* Brand */}
          <div className="flex items-center gap-4 px-6 py-5 border-b border-slate-200">
            <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-teal-600 to-teal-500 text-white flex items-center justify-center shadow">
              <Layers size={22} />
            </div>

            <div>
              <p className="text-sm font-semibold text-slate-900 leading-tight">
                FocusFlow
              </p>
              <p className="text-xs text-slate-500">
                Work with clarity
              </p>
            </div>

            <button
              onClick={() => setOpen(false)}
              className="ml-auto md:hidden p-2 rounded-md hover:bg-slate-100 transition"
            >
              <X size={18} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-1">
            {navItems.map(({ label, path, icon: Icon }) => (
              <button
                key={path}
                onClick={() => {
                  navigate(path);
                  setOpen(false);
                }}
                className={`
                  flex w-full items-center gap-3
                  rounded-lg px-4 py-2.5
                  text-sm font-medium
                  transition-all
                  ${isActive(path)}
                `}
              >
                <Icon size={18} />
                {label}
              </button>
            ))}

            {/* Create Task */}
            <button
              onClick={() => {
                navigate("/create-task");
                setOpen(false);
              }}
              className="
                mt-6 flex w-full items-center gap-3
                rounded-lg
                border border-teal-200
                bg-teal-50
                px-4 py-2.5
                text-sm font-medium text-teal-700
                hover:bg-teal-100
                transition
              "
            >
              <Plus size={18} />
              Create Task
            </button>
          </nav>

          {/* Logout */}
          <div className="px-4 py-4 border-t border-slate-200">
            <button
              onClick={() => {
                localStorage.removeItem("todotoken");
                window.location.replace("/");
              }}
              className="
                flex w-full items-center gap-3
                rounded-lg px-4 py-2.5
                text-sm font-medium text-red-600
                hover:bg-red-50
                transition
              "
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
