import { createContext, useContext, useState } from "react";
import {
  createTaskRequest,
  deleteTasksRequest,
  getTaskRequest,
  getTasksRequest,
  updateTasksRequest,
} from "../api/tasks";

const TaskContext = createContext();

export const useTasks = () => {
  const context = useContext(TaskContext);

  if (!context) {
    throw new Error("useTasks must be used within a TaskProvider");
  }
  return context;
};

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);

  const getTasks = async () => {
    try {
      const res = await getTasksRequest();
      setTasks(resdata);
    } catch (error) {
      console.log("🚀 ~ getTasks ~ error:", error);
    }
  };

  const createTask = async (task) => {
    try {
      const res = await createTaskRequest(task);
    } catch (error) {
      console.log("🚀 ~ createTask ~ res:", res);
    }
  };

  const getTask = async (id) => {
    try {
      const res = await getTaskRequest(id);
      return res.data;
    } catch (error) {
      console.log("🚀 ~ getTask ~ error:", error);
    }
  };

  const updateTask = async (id, task) => {
    try {
      const res = await updateTasksRequest(id, task);
    } catch (error) {
      console.log("🚀 ~ getTask ~ error:", error);
    }
  };

  const deleteTask = async () => {
    try {
      const res = deleteTasksRequest(id);
      if (res.status === 204) setTasks(tasks.filter((task) => task._id !== id));
    } catch (error) {
      console.log("🚀 ~ getTask ~ error:", error);
    }
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        createTask,
        getTasks,
        getTask,
        updateTask,
        deleteTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}
