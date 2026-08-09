import { useState } from 'react';
import { useTasks } from '../context/TaskContext';
import styles from "./Task.module.css";

export default function AddTaskForm() {
  const { addTask } = useTasks();
  const [form, setForm] = useState({
    title: '',
    description: '',
    status: '',
    priority: ''
  });
  
  const [status, setStatus] = useState('todo');
  const [priority, setPriority] = useState('medium');

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;

    addTask(form);
    
    setForm({
      title: '',
      description: '',
      status: '',
      priority: ''
    });
  };

  return (
    <div>
      <h1>Add New Task</h1>
      <form onSubmit={handleSubmit} className={styles['add-task-form']}>
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
        <button 
          type="submit" 
          className={styles['submit-button']}
          disabled={
            !form.title.trim() || 
            !form.description.trim() || 
            !form.status || 
            !form.priority
          }
        >
          Add Task
        </button>
      </form>
    </div>
  );
}
