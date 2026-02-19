export const validateActivity = (activityName, caloriesBurned, timeSpent) => {
  if (!activityName || !activityName.trim()) {
    return "Activity name cannot be empty";
  }

  if (!caloriesBurned || !caloriesBurned.trim()) {
    return "Calories cannot be empty";
  }

  if (isNaN(caloriesBurned) || Number(caloriesBurned) < 0) {
    return "Calories must be a positive number";
  }

  if (!timeSpent || !timeSpent.trim()) {
    return "Time spent cannot be empty";
  }

  if (isNaN(timeSpent) || Number(timeSpent) < 0) {
    return "Time spent must be a positive number";
  }

  return null; // No error
};
