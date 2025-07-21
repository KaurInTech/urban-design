// store.ts
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import projectReducer from './projectSlice';
import queryReducer from './querySlice'; 

export const store = configureStore({
  reducer: {
    user: userReducer,
    project: projectReducer,
    query: queryReducer, 
  },
});

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
