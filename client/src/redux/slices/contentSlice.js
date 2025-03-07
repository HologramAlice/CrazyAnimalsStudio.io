import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  content: [],
  currentContent: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// Получение всего контента
export const getAllContent = createAsyncThunk(
  'content/getAll',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/api/content');
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Получение контента по секции
export const getContentBySection = createAsyncThunk(
  'content/getBySection',
  async (section, thunkAPI) => {
    try {
      const response = await axios.get(`/api/content/${section}`);
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Создание нового контента
export const createContent = createAsyncThunk(
  'content/create',
  async (contentData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.post('/api/content', contentData, config);
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Обновление контента
export const updateContent = createAsyncThunk(
  'content/update',
  async ({ id, contentData }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.put(`/api/content/${id}`, contentData, config);
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Удаление контента
export const deleteContent = createAsyncThunk(
  'content/delete',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.delete(`/api/content/${id}`, config);
      return id;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Загрузка изображения
export const uploadImage = createAsyncThunk(
  'content/uploadImage',
  async (formData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.post('/api/content/upload', formData, config);
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const contentSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
    setCurrentContent: (state, action) => {
      state.currentContent = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllContent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllContent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.content = action.payload;
      })
      .addCase(getAllContent.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getContentBySection.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getContentBySection.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.currentContent = action.payload;
      })
      .addCase(getContentBySection.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createContent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createContent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.content.push(action.payload);
      })
      .addCase(createContent.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateContent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateContent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.content = state.content.map((item) =>
          item._id === action.payload._id ? action.payload : item
        );
        if (state.currentContent && state.currentContent._id === action.payload._id) {
          state.currentContent = action.payload;
        }
      })
      .addCase(updateContent.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteContent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteContent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.content = state.content.filter((item) => item._id !== action.payload);
        if (state.currentContent && state.currentContent._id === action.payload) {
          state.currentContent = null;
        }
      })
      .addCase(deleteContent.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(uploadImage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(uploadImage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
      })
      .addCase(uploadImage.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset, setCurrentContent } = contentSlice.actions;
export default contentSlice.reducer; 