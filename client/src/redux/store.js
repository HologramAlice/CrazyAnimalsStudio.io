import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import contentReducer from './slices/contentSlice';
import applicationReducer from './slices/applicationSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    content: contentReducer,
    application: applicationReducer,
  },
}); 