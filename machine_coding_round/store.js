import { configureStore } from "@reduxjs/toolkit";
import activityTrackerSlice from "./src/Activity_Tracker_Redux/activityTrackerSlice";

const store = configureStore({
  // reducer
    reducer:{
        // add slices 
        activityTracker:activityTrackerSlice
    }
});

export default store;
