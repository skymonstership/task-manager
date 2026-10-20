import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.heading}>
      <h1 className={styles.title}>📋 Task Manager</h1>
    </header>
  );
}