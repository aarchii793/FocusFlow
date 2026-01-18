import { Trash2, X, AlertTriangle } from "lucide-react";
import { useState, useContext } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import { getAuthHeader } from "../../lib/GetHeader";
import { AppContext } from "../../context/AppContext";

const DeleteDialog = ({ open, onClose, taskId }) => {
  const { fetchTasks, fetchTaskStats, fetchRecentTasks } =
    useContext(AppContext);

  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const onDelete = async () => {
    if (!taskId || loading) return;

    const toastId = toast.loading("Deleting task…");

    try {
      setLoading(true);

      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/task/delete/${taskId}`,
        getAuthHeader()
      );

      toast.success("Task deleted", { id: toastId });
      fetchTasks();
      fetchTaskStats();
      fetchRecentTasks();
      onClose();
    } catch {
      toast.error("Failed to delete task", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm" />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
        <div className="relative w-full max-w-md rounded-3xl bg-white shadow-2xl border border-slate-200">

          {/* Close */}
          <button
            onClick={onClose}
            disabled={loading}
            className="absolute right-4 top-4 rounded-lg p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
          >
            <X size={18} />
          </button>

          {/* Header */}
          <div className="flex flex-col items-center text-center px-6 pt-10">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-50 text-teal-600 shadow-inner">
              <Trash2 size={24} />
            </div>

            <h2 className="mt-5 text-lg font-semibold text-slate-900">
              Delete this task?
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              This action cannot be undone.
            </p>
          </div>

          {/* Warning box */}
          <div className="px-6 py-6">
            <div className="flex gap-3 rounded-2xl border border-teal-100 bg-teal-50/60 px-4 py-3 text-sm text-slate-700">
              <AlertTriangle className="text-teal-600 mt-0.5" size={18} />
              <p className="leading-relaxed">
                Deleting this task will permanently remove all associated data.
                Please confirm before continuing.
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 px-6 py-5 border-t border-slate-200 bg-slate-50 rounded-b-3xl">
            {/* Cancel */}
            <button
              onClick={onClose}
              disabled={loading}
              className="
                flex-1 rounded-xl
                border border-slate-300 bg-white
                px-4 py-2.5 text-sm font-medium text-slate-700
                hover:bg-slate-100 transition
                disabled:opacity-60 disabled:cursor-not-allowed
              "
            >
              Cancel
            </button>

            {/* Delete */}
            <button
              onClick={onDelete}
              disabled={loading}
              className="
                flex-1 rounded-xl
                bg-gradient-to-br from-teal-600 to-teal-500
                px-4 py-2.5 text-sm font-medium text-white
                shadow-md shadow-teal-500/30
                hover:from-teal-700 hover:to-teal-600
                transition
                disabled:opacity-60 disabled:cursor-not-allowed
              "
            >
              {loading ? "Deleting…" : "Delete"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteDialog;
