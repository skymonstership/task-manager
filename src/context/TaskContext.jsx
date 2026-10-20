import {
  createContext,
  useReducer,
  useState,
  useEffect,
  useContext,
} from "react";
import { taskReducer, initialState } from '../reducer/taskReducer';
import { API_BASE } from "../App";

export const TaskContext = createContext();

export function TaskProvider({ children }) {
  const [state, dispatch] = useReducer(taskReducer, initialState);
  const { tasks, loading, error, submitting } = state;
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const loadTasks = async () => {
      dispatch({ type: "FETCH_START" });
      try {
        const response = await fetch(`${API_BASE}/tasks`);
        if (!response.ok) throw new Error(`Server error: ${response.status}`);
        const data = await response.json();
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({ type: "FETCH_ERROR", payload: err.message });
      }
    };
    loadTasks();
  }, []);

  const addTask = async (taskData) => {
    dispatch({ type: "ADD_START" });
    try {
      const response = await fetch(`${API_BASE}/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(taskData),
      });
      if (!response.ok) throw new Error(`Server error: ${response.status}`);
      const createdTask = await response.json();
      dispatch({ type: "ADD_TASK", payload: createdTask });
      return createdTask;
    } catch (err) {
      dispatch({ type: "ADD_ERROR" });
      alert(`Failed to add task: ${err.message}`);
    }
  };

  const updateTask = async (taskId, updates) => {
    try {
      const response = await fetch(`${API_BASE}/tasks/${taskId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });
      if (!response.ok) throw new Error(`Server error: ${response.status}`);
      const updated = await response.json();
      dispatch({ type: "UPDATE_TASK", payload: updated });
    } catch (err) {
      alert(`Failed to update task: ${err.message}`);
    }
  };
  
  const deleteTask = async (taskId) => {
    if (!window.confirm("Are you sure you want to delete this task?"))
      return;
    try {
      const response = await fetch(`${API_BASE}/tasks/${taskId}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error(`Server error: ${response.status}`);
      dispatch({ type: "DELETE_TASK", payload: taskId });
    } catch (err) {
      alert(`Failed to delete task: ${err.message}`);
    }
  };

  const reorderTasks = async (dragId, dropId) => {
    if (dragId === dropId) return;

    const fromIndex = tasks.findIndex((t) => String(t.id) === String(dragId));
    const toIndex = tasks.findIndex((t) => String(t.id) === String(dropId));

    if (fromIndex === -1 || toIndex === -1) return;

    const reordered = [...tasks];
    const [movedTask] = reordered.splice(fromIndex, 1);
    reordered.splice(toIndex, 0, movedTask);

    const tasksWithOrder = reordered.map((task, index) => ({
      ...task,
      order: index,
    }));

    dispatch({ type: "REORDER_TASKS", payload: tasksWithOrder });

    try {
      await Promise.all(
        tasksWithOrder.map((task) =>
          fetch(`${API_BASE}/tasks/${task.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ order: task.order }),
          })
        )
      );
    } catch (err) {
      alert(`Failed to save task order: ${err.message}`);
    }
  };

  const filteredTasks = tasks
    .filter((task) => task.title.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter((task) => filter === "all" || task.status === filter);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        filteredTasks,
        loading,
        error,
        submitting,
        searchTerm,
        filter,
        addTask,
        updateTask,
        deleteTask,
        reorderTasks,
        setSearchTerm,
        setFilter,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  return useContext(TaskContext);
}