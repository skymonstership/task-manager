import FilterBar from '../components/FilterBar';
import AddTaskForm from '../components/AddTaskForm';
import TaskList from '../components/TaskList';
import AISummary from '../components/AISummary';
import { useTasks } from '../context/TaskContext';
import styles from "./TaskListPage.module.css";

export default function TaskListPage() {
  const {
    filteredTasks,
    tasks,
    summary,
    summaryLoading,
    summaryError,
    fetchSummary
  } = useTasks();

  return (
    <div className={styles.page}>
      <AddTaskForm />
      <AISummary />
      <h1 className={styles.heading}>Task Dashboard</h1>
      <p className={styles.subtitle}>Showing {filteredTasks.length} of {tasks.length} tasks</p>
      <FilterBar />
      <TaskList />
    </div>
  );
}