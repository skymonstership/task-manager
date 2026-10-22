import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { TaskProvider } from './context/TaskContext';
import Header from './components/Header';
import TaskListPage from './pages/TaskListPage';
import TaskDetailPage from './pages/TaskDetailPage';
import "./App.css";

// export const API_BASE = "https://taskflow-api-production-72ab.up.railway.app/api";
export const API_BASE = "https://module4-taskflow-api.onrender.com/api";

export default function App() {
  return (
    <TaskProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/tasks" element={<TaskListPage />} />
          <Route path="/tasks/:id" element={<TaskDetailPage />} />
          <Route path="*" element={<Navigate to="/tasks" replace />} />
        </Routes>
      </BrowserRouter>
    </TaskProvider>
  );
}