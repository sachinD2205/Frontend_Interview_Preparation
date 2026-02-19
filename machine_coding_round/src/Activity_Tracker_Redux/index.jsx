import ActivityList from "./ActivityList";
import AddActivity from "./AddActivity";
import styles from "./Activity_Tracker_Redux.module.css";

const Activity_Tracker_Redux = () => {
  return (
    <div className={styles.container}>
      <div className={styles.mainHeader}>🏃 Activity Tracker</div>
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Add New Activity</h2>
        <AddActivity />
      </div>
      <hr className={styles.divider} />
      <div className={styles.section}>
        <ActivityList />
      </div>
    </div>
  );
};

export default Activity_Tracker_Redux;
