import { useTasks } from '../context/TaskContext';
import styles from "./Task.module.css";


export default function FilterBar() {
  const { filter, setFilter } = useTasks();

  const filters = ['all', 'todo', 'in-progress', 'done'];

  return (
    <div className={styles['filter-bar']}>
      {filters.map((f) => (
        <button
          key={f}
          className={`${styles['filter-btn']} ${filter === f ? styles['filter-btn-active'] : ''}`}
          onClick={() => setFilter(f)}
        >
          {f === 'in-progress' 
            ? 'In Progress' 
            : f.charAt(0).toUpperCase() + f.slice(1)}
        </button>
      ))}
    </div>
  );
}