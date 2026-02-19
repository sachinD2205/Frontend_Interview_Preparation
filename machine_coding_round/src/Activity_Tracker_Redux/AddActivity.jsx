import { useState } from "react";
import { useDispatch } from "react-redux";
import { addActivity } from "./activityTrackerSlice";
import { validateActivity } from "./activityValidation";
import styles from "./Activity_Tracker_Redux.module.css";

const AddActivity = () => {
  const [activityName, setActivityName] = useState("");
  const [caloriesBurned, setCaloriesBurned] = useState("");
  const [timeSpent, setTimeSpent] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const dispatch = useDispatch();
  const clearFields = () => {
    setActivityName("");
    setCaloriesBurned("");
    setTimeSpent("");
    setErrorMsg("");
  };
  const addNewActivity = () => {
    const error = validateActivity(activityName, caloriesBurned, timeSpent);

    if (error) {
      setErrorMsg(error);
      return;
    }

    setErrorMsg("");

    const data = {
      activityName: activityName.trim(),
      caloriesBurned: Number(caloriesBurned),
      timeSpent: Number(timeSpent),
    };
    dispatch(addActivity(data));
    clearFields();
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.inputGroup}>
        <input
          type="text"
          className={styles.input}
          value={activityName}
          onChange={(e) => setActivityName(e.target.value)}
          placeholder="Enter Activity Name ..."
        />
      </div>
      <div className={styles.inputGroup}>
        <input
          type="text"
          className={styles.input}
          value={caloriesBurned}
          onChange={(e) => setCaloriesBurned(e.target.value)}
          placeholder="Enter Calories"
        />
      </div>
      <div className={styles.inputGroup}>
        <input
          type="text"
          className={styles.input}
          value={timeSpent}
          onChange={(e) => setTimeSpent(e.target.value)}
          placeholder="Enter Time Spent"
        />
      </div>
      {errorMsg && <div className={styles.errorMsg}>{errorMsg}</div>}
      <button className={styles.addBtn} onClick={addNewActivity}>
        ADD ACTIVITY
      </button>
    </div>
  );
};

export default AddActivity;
