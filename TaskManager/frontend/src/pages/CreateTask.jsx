import { useEffect } from "react";
import Sidebar from "../component/Sidebar";
import SideComponentWrapper from "../component/SideComponentWrapper";
import TaskForm from "../component/TaskForm";
import { ClipboardList } from "lucide-react";

const CreateTask = () => {
  useEffect(() => {
    document.title = "Create Task | FocusFlow";
  }, []);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-100 via-white to-teal-50 justify-end">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <SideComponentWrapper>
        <main className="space-y-10 relative">
          {/* Ambient background glow */}
          <div className="absolute -top-24 -right-24 h-72 w-72 bg-teal-400/10 rounded-full blur-3xl pointer-events-none" />

          {/* Page Heading (Dashboard-style) */}
          <div className="flex items-center gap-4">
            <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-teal-600 to-teal-500 text-white flex items-center justify-center shadow">
              <ClipboardList size={22} />
            </div>

            <div>
              <h1 className="text-xl md:text-2xl font-semibold text-slate-900">
                Create Task
              </h1>
              <p className="text-sm text-slate-500">
                Add a new task and stay organized
              </p>
            </div>
          </div>

          {/* Task Form */}
          <div>
            <TaskForm />
          </div>
        </main>
      </SideComponentWrapper>
    </div>
  );
};

export default CreateTask;
