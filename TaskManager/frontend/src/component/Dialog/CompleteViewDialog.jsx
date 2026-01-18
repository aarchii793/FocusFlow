import {
  Flame,
  Zap,
  Leaf,
  CheckCircle2,
  Hourglass,
  Calendar,
  X,
  Pencil,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import DeleteDialog from "../Dialog/DeleteDialog";

const CompleteViewDialog = ({ open, onClose, task }) => {
  const [openDelete, setOpenDelete] = useState(false);

  if (!open || !task) return null;

  const priorityMap = {
    high: {
      icon: Flame,
      pill: "bg-teal-50 text-teal-700 border border-teal-100",
    },
    medium: {
      icon: Zap,
      pill: "bg-slate-100 text-slate-700 border border-slate-200",
    },
    low: {
      icon: Leaf,
      pill: "bg-emerald-50 text-emerald-700 border border-emerald-100",
    },
  };

  const statusMap = {
    completed: {
      icon: CheckCircle2,
      pill: "bg-emerald-50 text-emerald-700 border border-emerald-100",
    },
    pending: {
      icon: Hourglass,
      pill: "bg-slate-100 text-slate-700 border border-slate-200",
    },
    "in-progress": {
      icon: Hourglass,
      pill: "bg-teal-50 text-teal-700 border border-teal-100",
    },
  };

  const p = priorityMap[task.priority] || priorityMap.medium;
  const s = statusMap[task.status] || statusMap.pending;

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm" />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
        <div className="relative w-full max-w-2xl rounded-3xl bg-white shadow-2xl border border-slate-200">

          {/* Close */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition"
          >
            <X size={18} />
          </button>

          {/* Header */}
          <div className="px-6 pt-8 pb-5 border-b border-slate-200">
            <h2 className="text-xl md:text-2xl font-semibold text-slate-900 leading-snug">
              {task.title}
            </h2>

            <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
              <span
                className={`inline-flex items-center gap-1 rounded-full px-3 py-1 font-medium ${p.pill}`}
              >
                <p.icon size={14} />
                {task.priority}
              </span>

              <span
                className={`inline-flex items-center gap-1 rounded-full px-3 py-1 font-medium ${s.pill}`}
              >
                <s.icon size={14} />
                {task.status}
              </span>

              <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-slate-600">
                <Calendar size={14} />
                {new Date(task.dueDate).toLocaleDateString()}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="px-6 py-6">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700 leading-relaxed max-h-72 overflow-y-auto">
              {task.description?.trim() ||
                "No description provided for this task."}
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 px-6 py-5 border-t border-slate-200 bg-slate-50 rounded-b-3xl">
            {/* Edit */}
            <a
              href={`/edit-task/${task._id}`}
              className="
                inline-flex items-center gap-2
                rounded-xl border border-slate-300 bg-white
                px-4 py-2.5
                text-sm font-medium text-slate-700
                hover:bg-slate-100 transition
              "
            >
              <Pencil size={16} />
              Edit
            </a>

            {/* Delete */}
            <button
              onClick={() => setOpenDelete(true)}
              className="
                inline-flex items-center gap-2
                rounded-xl
                bg-gradient-to-br from-teal-600 to-teal-500
                px-4 py-2.5
                text-sm font-medium text-white
                shadow-md shadow-teal-500/30
                hover:from-teal-700 hover:to-teal-600
                transition
              "
            >
              <Trash2 size={16} />
              Delete
            </button>
          </div>
        </div>
      </div>

      {/* Delete Confirmation */}
      <DeleteDialog
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        taskId={task._id}
      />
    </>
  );
};

export default CompleteViewDialog;
