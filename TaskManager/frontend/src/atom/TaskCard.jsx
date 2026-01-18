import {
  Flame,
  Zap,
  Leaf,
  CheckCircle2,
  Hourglass,
  Pencil,
  Calendar,
  Trash2,
  Eye,
} from "lucide-react";
import { useState } from "react";
import DeleteDialog from "../component/Dialog/DeleteDialog";
import CompleteViewDialog from "../component/Dialog/CompleteViewDialog";
import IconButton from "./IconButton";

const TaskCard = ({
  _id,
  title,
  dueDate,
  description,
  status,
  priority,
  onEdit,
}) => {
  const [openDelete, setOpenDelete] = useState(false);
  const [openView, setOpenView] = useState(false);

  /* ===== Theme Maps ===== */
  const priorityMap = {
    high: {
      icon: Flame,
      color: "text-rose-600",
      dot: "bg-rose-500",
      pill: "bg-rose-50 text-rose-700",
    },
    medium: {
      icon: Zap,
      color: "text-teal-600",
      dot: "bg-teal-500",
      pill: "bg-teal-50 text-teal-700",
    },
    low: {
      icon: Leaf,
      color: "text-emerald-600",
      dot: "bg-emerald-500",
      pill: "bg-emerald-50 text-emerald-700",
    },
  };

  const statusMap = {
    completed: {
      icon: CheckCircle2,
      label: "Completed",
      pill: "bg-emerald-50 text-emerald-700 border-emerald-200",
    },
    pending: {
      icon: Hourglass,
      label: "Pending",
      pill: "bg-slate-100 text-slate-700 border-slate-300",
    },
    "in-progress": {
      icon: Hourglass,
      label: "In Progress",
      pill: "bg-teal-50 text-teal-700 border-teal-200",
    },
  };

  const p = priorityMap[priority] || priorityMap.medium;
  const s = statusMap[status] || statusMap.pending;

  return (
    <>
      {/* Card */}
      <div
        className="
          group relative
          rounded-2xl
          border border-slate-200
          bg-white
          px-5 py-4
          shadow-sm
          transition-all duration-300
          hover:shadow-md
          hover:-translate-y-0.5
        "
      >
        {/* ===== Header ===== */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            {/* Priority dot */}
            <span
              className={`mt-1 h-2.5 w-2.5 rounded-full ${p.dot}`}
              title={`${priority} priority`}
            />

            <div>
              <h3 className="text-sm font-semibold text-slate-900 leading-snug">
                {title}
              </h3>

              <p className="mt-1 max-w-lg text-sm text-slate-500 line-clamp-2">
                {description?.trim() || "No description provided for this task."}
              </p>
            </div>
          </div>

          {/* Status */}
          <span
            className={`
              inline-flex items-center gap-1.5
              rounded-full border
              px-3 py-1
              text-xs font-medium
              ${s.pill}
            `}
          >
            <s.icon size={12} />
            {s.label}
          </span>
        </div>

        {/* ===== Footer / Meta ===== */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-xs text-slate-500">
            {/* Due date */}
            <span className="inline-flex items-center gap-1">
              <Calendar size={14} />
              {new Date(dueDate).toLocaleDateString()}
            </span>

            {/* Priority */}
            <span className={`inline-flex items-center gap-1 ${p.color}`}>
              <p.icon size={14} />
              {priority}
            </span>
          </div>

          {/* Actions */}
          <div className="flex gap-2 opacity-90 group-hover:opacity-100 transition">
            <IconButton
              icon={Eye}
              label="View"
              variant="ghost"
              onClick={() => setOpenView(true)}
            />
            <IconButton
              icon={Pencil}
              label="Edit"
              variant="secondary"
              to={`/edit-task/${_id}`}
              onClick={onEdit}
            />
            <IconButton
              icon={Trash2}
              label="Delete"
              variant="danger"
              onClick={() => setOpenDelete(true)}
            />
          </div>
        </div>
      </div>

      {/* Dialogs */}
      <DeleteDialog
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        taskId={_id}
      />

      <CompleteViewDialog
        open={openView}
        onClose={() => setOpenView(false)}
        task={{ _id, title, description, status, priority, dueDate }}
      />
    </>
  );
};

export default TaskCard;
