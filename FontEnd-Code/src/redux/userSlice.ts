import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface UserState {
  email: string | null;
  token: string | null;
  status: 'idle' | 'loading' | 'failed';
  loading: boolean; // Add this line
  error: string | null; // Add this line
}

const initialState: UserState = {
  email: null,
  token: null,
  status: 'idle',
  loading: false, // Add this line
  error: null, // Add this line
};

export const loginUser = createAsyncThunk(
  'user/login',
  async ({email, password }: { email: string; password: string }) => {
    try{
    const response = await fetch('http://localhost:5000/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    console.log("response",response);
    if (!response.ok) {
      throw new Error('Failed to login');
    }
    return await response.json();
    } catch (error) {
      throw error; // Rethrow the error to be caught by the rejection handler
    }
  }
);

export const registerUser = createAsyncThunk(
  'user/register',
  async ({ name, email, password }: { name: string; email: string; password: string }) => {
    const response = await fetch('http://localhost:5000/api/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }), // Corrected this line
    });
    if (!response.ok) {
      throw new Error('Failed to register');
    }
    return await response.json();
  }
);


const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
        state.loading = true; // Add this line
        state.error = null; // Add this line
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loading = false;
        state.email = action.payload.email ?? null;
        state.token = action.payload.token ?? null;
      })
      .addCase(loginUser.rejected, (state,action) => {
        state.status = 'failed';
        state.loading = false;
        state.error = action.error.message ?? 'Failed to login';
      })
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading';
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loading = false;
        state.email = action.payload.email ?? null;
        state.token = action.payload.token ?? null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed';
        state.loading = false;
        state.error = action.error.message ?? 'Failed to register';
      });
  },
});

export default userSlice.reducer;

