import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { UserType, LoginPayload, UserState } from "@/types";
import { loginUserAPI, logoutUserAPI } from "@/services/apiCalls";
import { RootState } from "../store";

const getUserFromLocalStorage = (): UserType | null => {
  if (typeof window === "undefined") {
    return null;
  }

  const userString = localStorage.getItem("user");
  return userString ? JSON.parse(userString) : null;
};

const initialState: UserState = {
  user: getUserFromLocalStorage(),
  loading: false,
  error: null,
  isAdmin: getUserFromLocalStorage()?.email.endsWith("@admin.com") || false,
};

export const loginUserThunk = createAsyncThunk(
  "user/login",
  async (payload: LoginPayload, { rejectWithValue }) => {
    const { email, password } = payload;
    try {
      const response = await loginUserAPI(email, password);
      return response.user;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const logoutUserThunk = createAsyncThunk(
  "user/logout",
  async (_, { rejectWithValue }) => {
    try {
      await logoutUserAPI();
      localStorage.removeItem("user");
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
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
        state.user = action.payload;
        state.isAdmin =
          action.payload.email && action.payload.email.endsWith("@admin.com");
        state.error = null;
        localStorage.setItem("user", JSON.stringify(action.payload));
        console.log("isAdmin --> ", state.isAdmin);
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
        state.isAdmin = false;
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

export const selectUser = (state: RootState) => state.user.user;
export const selectLoading = (state: RootState) => state.user.loading;
export const selectError = (state: RootState) => state.user.error;
export const selectIsAdmin = (state: RootState) => state.user.isAdmin;

export default userSlice.reducer;