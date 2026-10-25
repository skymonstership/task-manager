import { useTasks } from '../context/TaskContext';
import styles from './AISummary.module.css';

export default function AISummary() {
    const { summary, summaryLoading, summaryError, fetchSummary } = useTasks();

    return (
        <section className={styles.container}>
            <div className={styles.summaryHeader}>
                <h2 className={styles.summaryTitle}>🤖 AI Task Summary</h2>
                <button
                    className={styles.refreshButton}
                    onClick={fetchSummary}
                    disabled={summaryLoading}
                >
                    {summaryLoading ? 'Generating...' : 'Refresh Summary'}
                </button>
            </div>

            <div className={styles.summaryBox}>
                {summaryError && (
                    <p className={styles.summaryError}>
                        Failed to load summary: {summaryError}
                    </p>
                )}

                {summary ? (
                    <div className={styles.summaryContent}>
                        {summary}
                    </div>
                ) : (
                    !summaryLoading && (
                        <p className={styles.summaryEmpty}>
                            No summary generated yet. Manage tasks or click refresh to generate one.
                        </p>
                    )
                )}
            </div>
        </section>
    );
}