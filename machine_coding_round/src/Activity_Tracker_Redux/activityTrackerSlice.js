import { createSlice, nanoid } from "@reduxjs/toolkit";

const activityTrackerSlice = createSlice({
  name: "activityTracker",
  initialState: {
    activities: [],
  },
  reducers: {
    addActivity: {
      reducer(state, action) {
        const payload = {
          ...action.payload,
          id: nanoid(),
        };
        state.activities.push(payload);
      },
    },
    deleteActivity: {
      reducer(state, action) {
        state.activities = state.activities.filter(
          (activity) => activity.id !== action.payload,
        );
      },
    },
    editActivity: {
      reducer(state, action) {
        state.activities = state.activities.map((activity) =>
          activity.id === action.payload.id ? action.payload : activity
        );
      },
    },
  },
});

export const { addActivity, deleteActivity, editActivity } = activityTrackerSlice.actions;
export default activityTrackerSlice.reducer;
