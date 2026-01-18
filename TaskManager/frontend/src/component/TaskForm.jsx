import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  ClipboardList,
  Flag,
  Calendar,
  Activity,
} from "lucide-react";

import Heading from "../atom/Heading";
import { getAuthHeader } from "../lib/GetHeader";

const TaskForm = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("medium");
  const [status, setStatus] = useState("pending");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !dueDate) {
      toast.error("Title and due date are required");
      return;
    }

    try {
      setLoading(true);

      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/task/create`,
        { title, description, dueDate, priority, status },
        getAuthHeader()
      );

      toast.success("Task created successfully");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create task");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl">
      {/* Header */}
      

      {/* Form Card */}
      <form
        onSubmit={handleSubmit}
        className="mt-8 rounded-2xl border border-slate-200 bg-white shadow-sm"
      >
        <div className="p-6 space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Task title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Finish dashboard UI"
              className="
                w-full rounded-lg border border-slate-300
                px-4 py-2.5 text-sm
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
              placeholder="Optional notes or details"
              className="
                w-full rounded-lg border border-slate-300
                px-4 py-2.5 text-sm
                placeholder:text-slate-400 resize-none
                focus:outline-none focus:ring-2 focus:ring-teal-500
                transition
              "
            />
          </div>

          {/* Meta */}
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
                  w-full rounded-lg border border-slate-300
                  px-3 py-2.5 text-sm
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
                  w-full rounded-lg border border-slate-300
                  px-3 py-2.5 text-sm
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
                  w-full rounded-lg border border-slate-300
                  px-3 py-2.5 text-sm
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
        <div className="flex items-center justify-end gap-4 border-t border-slate-200 bg-slate-50 px-6 py-4 rounded-b-2xl">
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
              inline-flex items-center justify-center
              px-6 py-2.5
              rounded-xl
              bg-teal-600 text-white
              text-sm font-semibold
              shadow-lg shadow-teal-500/30
              hover:bg-teal-700
              hover:-translate-y-0.5
              transition-all duration-300
              disabled:opacity-60 disabled:cursor-not-allowed
            "
          >
            {loading ? "Creating..." : "Create task"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
