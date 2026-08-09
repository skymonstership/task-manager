import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useTasks } from "../context/TaskContext";
import styles from "./Task.module.css";

export default function TaskList() {
  const { filteredTasks, deleteTask, reorderTasks, filter } = useTasks();
  const [draggingId, setDraggingId] = useState(null);
  const [dropTargetId, setDropTargetId] = useState(null);
  const didDragRef = useRef(false);

  const canReorder = filter === "all";

  const handleDragStart = (e, id) => {
    if (!canReorder) return;
    setDraggingId(id);
    setDropTargetId(null);
    didDragRef.current = true;
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", String(id));
  };

  const handleDragOver = (e, id) => {
    if (!canReorder) return;
    e.preventDefault();
    if (id !== draggingId) {
      setDropTargetId(id);
    }
  };

  const handleDrop = (e, id) => {
    if (!canReorder) return;
    e.preventDefault();
    const sourceId = e.dataTransfer.getData("text/plain") || draggingId;
    if (sourceId && String(sourceId) !== String(id)) {
      reorderTasks(sourceId, id);
    }
    setDraggingId(null);
    setDropTargetId(null);
  };

  const handleDragEnd = () => {
    setDraggingId(null);
    setDropTargetId(null);
  };

  const handleCardClick = (e) => {
    if (didDragRef.current) {
      e.preventDefault();
      didDragRef.current = false;
    }
  };

  if (filteredTasks.length === 0) {
    return <p className={styles.empty}>No tasks found.</p>;
  }

  return (
    <ul className={styles.list}>
      {filteredTasks.map((task) => (
        <li
          key={task.id}
          className={`${styles.card} ${
            draggingId === task.id ? styles.cardDragging : ""
          } ${dropTargetId === task.id ? styles.cardDropTarget : ""}`}
          draggable={canReorder}
          onDragStart={(e) => handleDragStart(e, task.id)}
          onDragOver={(e) => handleDragOver(e, task.id)}
          onDrop={(e) => handleDrop(e, task.id)}
          onDragEnd={handleDragEnd}
        >
          <Link
            to={`/tasks/${task.id}`}
            className={styles.cardLink}
            onClick={handleCardClick}
          >
            <div className={styles.info}>
              <div className={styles.titleRow}>
                <span className={styles.titleLink}>{task.title}</span>
                <span
                  className={`${styles.badge} ${
                    task.status === "completed"
                      ? styles.badgeCompleted
                      : styles.badgePending
                  }`}
                >
                  {task.status}
                </span>
              </div>
              <p className={styles.meta}>
                Priority: <span className={styles.bold}>{task.priority}</span>
              </p>
            </div>
          </Link>
          <button
            className={styles.deleteButton}
            onClick={(e) => {
              e.stopPropagation();
              deleteTask(task.id);
            }}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}