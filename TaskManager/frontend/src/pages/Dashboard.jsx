import Sidebar from "../component/Sidebar";
import TaskCard from "../atom/TaskCard";
import { Clock, BarChart3 } from "lucide-react";
import { useEffect, useContext } from "react";
import Heading from "../atom/Heading";
import SideComponentWrapper from "../component/SideComponentWrapper";
import { AppContext } from "../context/AppContext";

const Dashboard = () => {
  const {
    fetchRecentTasks,
    recentTasks,
    loading,
  } = useContext(AppContext);

  useEffect(() => {
    fetchRecentTasks();
  }, []);

  return (
    <div className="flex min-h-screen bg-slate-100 justify-end">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <SideComponentWrapper>
        <main className="space-y-10">
          {/* Dashboard Intro */}
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-teal-600 to-teal-500 text-white flex items-center justify-center shadow">
              <BarChart3 size={22} />
            </div>

            <div>
              <h1 className="text-xl md:text-2xl font-semibold text-slate-900">
                Dashboard
              </h1>
              <p className="text-sm text-slate-500">
                Overview of your recent activity
              </p>
            </div>
          </div>

          {/* Recent Tasks */}
          <section>
              

            {loading ? (
              <div className="text-sm text-slate-500">
                Loading tasks…
              </div>
            ) : recentTasks.length === 0 ? (
              <div className="text-sm text-slate-500">
                No recent tasks found
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                {recentTasks.map((task) => (
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
          </section>
        </main>
      </SideComponentWrapper>
    </div>
  );
};

export default Dashboard;
