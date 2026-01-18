import { createContext, useState } from "react";
import axios from "axios";
import { getAuthHeader } from "../lib/GetHeader";

export const AppContext = createContext(null);

const AppContextProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchTasks = async (filters = {}) => {
    setLoading(true);
    setError("");

    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/task/`, {
        ...getAuthHeader(),
        params: filters,
      });
      setTasks(res.data.tasks);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };
  // fetch recent tasks
  const [recentTasks, setRecentTasks] = useState([]);
  const fetchRecentTasks = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/task/recent-task`,
        getAuthHeader()
      );

      setRecentTasks(res.data.tasks);
    } catch (error) {
      console.error("Failed to fetch recent tasks", error);
    } finally {
      setLoading(false);
    }
  };

  

  
  

  const value = {
    tasks,
    loading,
    error,
    fetchTasks,
    fetchRecentTasks,
    recentTasks,
    setRecentTasks,
    
    
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
