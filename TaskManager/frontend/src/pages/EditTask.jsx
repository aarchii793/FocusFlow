import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import {
  ClipboardEdit,
  Calendar,
  Flag,
  Activity,
} from "lucide-react";

import Sidebar from "../component/Sidebar";
import { getAuthHeader } from "../lib/GetHeader";
import SideComponentWrapper from "../component/SideComponentWrapper";

const EditTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("medium");
  const [status, setStatus] = useState("pending");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = "Edit Task | FocusFlow";

    const fetchTask = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/task/fetch-task/${id}`,
          getAuthHeader()
        );

        const task = res.data.task;
        setTitle(task.title);
        setDescription(task.description || "");
        setDueDate(task.dueDate?.split("T")[0]);
        setPriority(task.priority);
        setStatus(task.status || "pending");
      } catch {
        toast.error("Failed to load task");
        navigate("/dashboard");
      }
    };

    fetchTask();
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !dueDate) {
      toast.error("Title and due date are required");
      return;
    }

    try {
      setLoading(true);

      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/task/update/${id}`,
        { title, description, dueDate, priority, status },
        getAuthHeader()
      );

      toast.success("Task updated successfully ✨");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update task");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-100 via-white to-teal-50 justify-end">
      <Sidebar />

      <SideComponentWrapper>
        <div className="relative">
          {/* Ambient glow */}
          <div className="absolute -top-24 -right-24 h-72 w-72 bg-teal-400/10 rounded-full blur-3xl pointer-events-none" />

          {/* ===== Custom Dashboard-style Heading ===== */}
          <div className="flex items-center gap-4 mb-12">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-teal-600 to-teal-500 text-white flex items-center justify-center shadow">
              <ClipboardEdit size={22} />
            </div>

            <div>
              <h1 className="text-xl md:text-2xl font-semibold text-slate-900">
                Edit Task
              </h1>
              <p className="text-sm text-slate-500">
                Refine details and keep your work flowing
              </p>
            </div>
          </div>

          {/* ===== Form Card ===== */}
          <form
            onSubmit={handleSubmit}
            className="
              max-w-3xl
              rounded-3xl
              bg-white/90 backdrop-blur
              border border-slate-200
              shadow-lg
            "
          >
            <div className="p-7 space-y-6">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Task title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Improve task workflow UI"
                  className="
                    w-full rounded-xl border border-slate-300
                    px-4 py-3 text-sm
                    placeholder:text-slate-400
                    focus:outline-none focus:ring-2 focus:ring-teal-500
                    transition
                  "
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Description
                </label>
                <textarea
                  rows={5}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Add any helpful details for this task"
                  className="
                    w-full resize-none rounded-xl border border-slate-300
                    px-4 py-3 text-sm
                    placeholder:text-slate-400
                    focus:outline-none focus:ring-2 focus:ring-teal-500
                    transition
                  "
                />
              </div>

              {/* Meta Fields */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Due Date */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-1">
                    <Calendar size={14} className="text-teal-600" />
                    Due date
                  </label>
                  <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="
                      w-full rounded-xl border border-slate-300
                      px-3 py-3 text-sm
                      focus:outline-none focus:ring-2 focus:ring-teal-500
                      transition
                    "
                  />
                </div>

                {/* Status */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-1">
                    <Activity size={14} className="text-teal-600" />
                    Status
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="
                      w-full rounded-xl border border-slate-300
                      px-3 py-3 text-sm
                      bg-white
                      focus:outline-none focus:ring-2 focus:ring-teal-500
                      transition
                    "
                  >
                    <option value="pending">Pending</option>
                    <option value="in-progress">In progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>

                {/* Priority */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-1">
                    <Flag size={14} className="text-teal-600" />
                    Priority
                  </label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="
                      w-full rounded-xl border border-slate-300
                      px-3 py-3 text-sm
                      bg-white
                      focus:outline-none focus:ring-2 focus:ring-teal-500
                      transition
                    "
                  >
                    <option value="low">Low priority</option>
                    <option value="medium">Medium priority</option>
                    <option value="high">High priority</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="
              flex items-center justify-end gap-4
              border-t border-slate-200
              bg-slate-50
              px-7 py-5
              rounded-b-3xl
            ">
              <button
                type="button"
                onClick={() => navigate("/dashboard")}
                className="text-sm font-medium text-slate-600 hover:text-slate-800 transition"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
                className="
                  px-7 py-3 rounded-xl
                  bg-gradient-to-br from-teal-600 to-teal-500
                  text-white text-sm font-semibold
                  shadow-lg shadow-teal-500/30
                  hover:from-teal-700 hover:to-teal-600
                  hover:-translate-y-0.5
                  transition-all duration-300
                  disabled:opacity-60 disabled:cursor-not-allowed
                "
              >
                {loading ? "Updating…" : "Update task"}
              </button>
            </div>
          </form>
        </div>
      </SideComponentWrapper>
    </div>
  );
};

export default EditTask;
