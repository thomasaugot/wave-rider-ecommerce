import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { UserType } from "@/types";
import { loginUser, logoutUser } from "@/services/apiCalls";
import { RootState } from "../store";

interface LoginPayload {
  email: string;
  password: string;
}

const getUserFromLocalStorage = (): UserType | null => {
  if (typeof window === "undefined") {
    return null;
  }

  const userString = localStorage.getItem("user");
  return userString ? JSON.parse(userString) : null;
};

interface UserState {
  user: UserType | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: getUserFromLocalStorage(),
  loading: false,
  error: null,
};

export const loginUserThunk = createAsyncThunk(
  "user/login",
  async (payload: LoginPayload, { rejectWithValue }) => {
    const { email, password } = payload;
    try {
      const { user, session, weakPassword } = await loginUser(email, password);
      return { user, session, weakPassword };
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const logoutUserThunk = createAsyncThunk(
  "user/logoutUser",
  async (_, thunkAPI) => {
    try {
      await logoutUser();
      if (typeof window !== "undefined") {
        localStorage.removeItem("user");
      }
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUserThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUserThunk.fulfilled, (state: any, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.error = null;
      })
      .addCase(loginUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload
          ? String(action.payload)
          : "Failed to login.";
      })
      .addCase(logoutUserThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUserThunk.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.error = null;
      })
      .addCase(logoutUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload
          ? String(action.payload)
          : "Failed to logout.";
      });
  },
});

export const selectUser = (state: RootState) => state.user;
export default userSlice.reducer;
