import Sidebar from "../component/Sidebar";
import TaskCard from "../atom/TaskCard";
import { Activity } from "lucide-react";
import { useEffect, useContext } from "react";
import { AppContext } from "../context/AppContext";
import SideComponentWrapper from "../component/SideComponentWrapper";

const InProgress = () => {
  const { tasks, loading, fetchTasks } = useContext(AppContext);

  useEffect(() => {
    document.title = "In-Progress Tasks | FocusFlow";
    fetchTasks({ status: "in-progress" });
  }, []);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-100 via-white to-teal-50 justify-end">
      <Sidebar />

      <SideComponentWrapper>
        <main className="space-y-10">
          {/* Page Heading (Dashboard style) */}
          <div className="flex items-center gap-4">
            <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-teal-600 to-teal-500 text-white flex items-center justify-center shadow">
              <Activity size={22} />
            </div>

            <div>
              <h1 className="text-xl md:text-2xl font-semibold text-slate-900">
                In Progress
              </h1>
              <p className="text-sm text-slate-500">
                Tasks currently being worked on
              </p>
            </div>
          </div>

          {/* Content */}
          {loading ? (
            <p className="text-sm text-slate-500 animate-pulse">
              Loading in-progress tasks…
            </p>
          ) : tasks.length === 0 ? (
            <div className="rounded-xl border border-dashed border-slate-300 bg-white/60 p-10 text-center">
              <p className="text-sm text-slate-500">
                No tasks are currently in progress.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {tasks.map((task) => (
                <TaskCard
                  key={task._id}
                  _id={task._id}
                  dueDate={task?.dueDate}
                  description={task.description}
                  title={task.title}
                  status={task.status}
                  priority={task.priority}
                />
              ))}
            </div>
          )}
        </main>
      </SideComponentWrapper>
    </div>
  );
};

export default InProgress;
