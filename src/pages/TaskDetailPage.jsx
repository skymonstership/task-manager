import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTasks } from '../context/TaskContext';
import styles from "./TaskDetailPage.module.css";
import { API_BASE } from "../App";


export default function TaskDetailPage() {
  const { id } = useParams();
  const { tasks, updateTask } = useTasks();
  const task = tasks.find((t) => String(t.id) === String(id));
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    title: '',
    description: '',
    status: '',
    priority: ''
  });

  if (!task) {
    return (
      <div className={styles.panel}>
        <h2>Task not found</h2>
        <Link to="/tasks">Back to Task List</Link>
      </div>
    );
  }

  const handleEditClick = () => {
    setForm({
      title: task.title || '',
      description: task.description || '',
      status: task.status || 'todo',
      priority: task.priority || 'medium'
    });
    setIsEditing(true);
  };

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (!form.title.trim()) return;
  //   updateTask(task.id, form);
  //   setIsEditing(false);
  // };

  const isUnchanged =
    form.title === (task.title || '') &&
    form.description === (task.description || '') &&
    form.status === (task.status || 'todo') &&
    form.priority === (task.priority || 'medium');

  const isDisabled = isUnchanged || !form.title.trim();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isDisabled) return;
    updateTask(task.id, form);
    setIsEditing(false);

    // setForm({
    //   title: '',
    //   description: '',
    //   status: '',
    //   priority: ''
    // });
  };

  return (
    <div className={styles.panel}>
      <Link to="/tasks"className={styles.backLink}>
        ← Back to tasks
      </Link>

      {isEditing ? (
        <form onSubmit={handleSubmit} className={styles['add-task-form']}>
          <h2>Edit Task</h2>

          <div className={styles['form-field']}>
            <label>Title</label>
            <input
              type="text"
              name="title"
              placeholder="Task title..."
              value={form.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles['form-field']}>
            <label>Description</label>
            <textarea
              placeholder="Description..."
              name="description"
              value={form.description}
              onChange={handleChange}
            />
          </div>

          <div className={styles['form-field']}>
            <label>Status</label>
            <select  
              name="status"
              value={form.status}
              onChange={handleChange}
            >
              <option value="" disabled>Select status...</option>
              <option value="todo">To Do</option>
              <option value="in-progress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </div>  

          <div className={styles['form-field']}>
            <label>Priority</label>
            <select
              name="priority"
              value={form.priority}
              onChange={handleChange}
            >
              <option value="" disabled>Select Priority...</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>    
          </div>

          <div className={styles['button-group']}>
            <button 
              type="submit" 
              className={styles['submit-button']}
              disabled={isDisabled}
            >
              Save Changes
            </button>
            <button 
              type="button" 
              className={styles['submit-button']}
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div>
          <h2 className={styles.title}>
            {task.title}
          </h2>
          <p className={styles.description}>
            {task.description}
          </p>
          <p className={styles.description}><strong>Status:</strong> {task.status}</p>
          <p className={styles.description}><strong>Priority:</strong> {task.priority}</p>
          <button 
            onClick={handleEditClick} 
            className={styles['submit-button']}
          >
            Edit Task
          </button>
        </div>
      )}
    </div>
  );
}