import { useState, useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Activity_Tracker_Redux.module.css";
import { deleteActivity, editActivity } from "./activityTrackerSlice";
import { validateActivity } from "./activityValidation";

const ActivityList = () => {
  const activities = useSelector((state) => state.activityTracker.activities);
  const dispatch = useDispatch();
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    activityName: "",
    caloriesBurned: "",
    timeSpent: "",
  });
  const [filterActivity, setFilterActivity] = useState("");

  const handleDelete = (id) => {
    dispatch(deleteActivity(id));
  };

  const handleEditButton = (data) => {
    setEditingId(data.id);
    setEditForm({
      activityName: data.activityName,
      caloriesBurned: data.caloriesBurned,
      timeSpent: data.timeSpent,
    });
  };

  const handleSave = (id) => {
    const error = validateActivity(
      editForm.activityName,
      editForm.caloriesBurned,
      editForm.timeSpent
    );

    if (error) {
      alert(error);
      return;
    }

    dispatch(
      editActivity({
        id,
        activityName: editForm.activityName.trim(),
        caloriesBurned: Number(editForm.caloriesBurned),
        timeSpent: Number(editForm.timeSpent),
      })
    );
    setEditingId(null);
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditForm({
      activityName: "",
      caloriesBurned: "",
      timeSpent: "",
    });
  };

  // Get unique activity names for filter (memoized for performance)
  const uniqueActivities = useMemo(() => {
    return [...new Set(activities.map((a) => a.activityName))];
  }, [activities]);

  // Filter activities based on selected filter
  const filteredActivities = filterActivity
    ? activities.filter((a) => a.activityName === filterActivity)
    : activities;

  // Clear editing state when filter changes
  useEffect(() => {
    if (editingId !== null) {
      setEditingId(null);
      setEditForm({
        activityName: "",
        caloriesBurned: "",
        timeSpent: "",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterActivity]);

  return (
    <div>
      <div className={styles.heading}>Activity List</div>
      <div className={styles.filterContainer}>
        <label className={styles.filterLabel}>Filter by Activity: </label>
        <select
          className={styles.filterSelect}
          value={filterActivity}
          onChange={(e) => setFilterActivity(e.target.value)}
        >
          <option value="">All Activities</option>
          {uniqueActivities.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>

      {filteredActivities.length > 0 ? (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Activity Name</th>
              <th>Calories Burned</th>
              <th>Time Spent</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredActivities.map((data) => (
              <tr key={data.id}>
                {editingId === data.id ? (
                  // Edit Mode
                  <>
                    <td>
                      <input
                        className={styles.editInput}
                        type="text"
                        value={editForm.activityName}
                        onChange={(e) =>
                          setEditForm({ ...editForm, activityName: e.target.value })
                        }
                      />
                    </td>
                    <td>
                      <input
                        className={styles.editInput}
                        type="text"
                        value={editForm.caloriesBurned}
                        onChange={(e) =>
                          setEditForm({ ...editForm, caloriesBurned: e.target.value })
                        }
                      />
                    </td>
                    <td>
                      <input
                        className={styles.editInput}
                        type="text"
                        value={editForm.timeSpent}
                        onChange={(e) =>
                          setEditForm({ ...editForm, timeSpent: e.target.value })
                        }
                      />
                    </td>
                    <td>
                      <button
                        className={styles.saveBtn}
                        onClick={() => handleSave(data.id)}
                      >
                        Save
                      </button>
                      <button
                        className={styles.cancelBtn}
                        onClick={handleCancel}
                      >
                        Cancel
                      </button>
                    </td>
                  </>
                ) : (
                  // Display Mode
                  <>
                    <td>{data.activityName}</td>
                    <td>{data.caloriesBurned}</td>
                    <td>{data.timeSpent}</td>
                    <td>
                      <button
                        className={styles.editBtn}
                        onClick={() => handleEditButton(data)}
                      >
                        Edit
                      </button>
                      <button
                        className={styles.deleteBtn}
                        onClick={() => handleDelete(data.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className={styles.noActivities}>
          {filterActivity
            ? `No activities found for "${filterActivity}"`
            : "No activities yet. Add one above!"}
        </p>
      )}
    </div>
  );
};

export default ActivityList;
