import Sidebar from "../component/Sidebar";
import Heading from "../atom/Heading";
import { CheckCircle2 } from "lucide-react";
import { useEffect, useContext } from "react";
import TaskCard from "../atom/TaskCard";
import { AppContext } from "../context/AppContext";
import SideComponentWrapper from "../component/SideComponentWrapper";

const CompletedTask = () => {
  const { tasks, loading, fetchTasks } = useContext(AppContext);

  useEffect(() => {
    document.title = "Completed Tasks | FocusFlow";
    fetchTasks({ status: "completed" });
  }, []);

  return (
    <div className="flex min-h-screen bg-slate-100 justify-end">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <SideComponentWrapper>
        <main className="space-y-10">
          {/* Page Intro */}
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-teal-600 to-teal-500 text-white flex items-center justify-center shadow">
              <CheckCircle2 size={22} />
            </div>

            <div>
              <h1 className="text-xl md:text-2xl font-semibold text-slate-900">
                Completed Tasks
              </h1>
              <p className="text-sm text-slate-500">
                Tasks you’ve successfully finished
              </p>
            </div>
          </div>

          {/* Completed Tasks Section */}
          <section>
            

            {loading ? (
              <p className="text-sm text-slate-500">
                Loading completed tasks…
              </p>
            ) : tasks.length === 0 ? (
              <div className="text-sm text-slate-500">
                No completed tasks found.
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                {tasks.map((task) => (
                  <TaskCard
                    key={task._id}
                    _id={task._id}
                    dueDate={task?.dueDate}
                    description={task?.description}
                    title={task?.title}
                    status={task?.status}
                    priority={task?.priority}
                  />
                ))}
              </div>
            )}
          </section>
        </main>
      </SideComponentWrapper>
    </div>
  );
};

export default CompletedTask;
