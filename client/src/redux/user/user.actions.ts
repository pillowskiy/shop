import { createAsyncThunk } from '@reduxjs/toolkit';

import type { AuthResponse, LoginBody, RegisterBody } from '@/types';
import AuthService from '@api/services/auth.service';

export const register = createAsyncThunk<AuthResponse, RegisterBody>(
  'auth/register',
  async (data, api) => {
    try {
      const response = await AuthService.register(data);
      return response.data;
    } catch (err) {
      return api.rejectWithValue(err);
    }
  }
);

export const login = createAsyncThunk<AuthResponse, LoginBody>(
  'auth/login',
  async (data, api) => {
    try {
      const response = await AuthService.login(data);
      return response.data;
    } catch (err) {
      return api.rejectWithValue(err);
    }
  }
);

export const logout = createAsyncThunk<{ refreshToken: string }>(
  'auth/logout',
  async (_, api) => {
  try {
    const response = await AuthService.logout();
    return response.data
  } catch(err) {
    return api.rejectWithValue(err);
  }
});

export const checkAuth = createAsyncThunk('auth/check-auth', async (_, api) => {
  try {
    const response = await AuthService.refresh();
    return response.data;
  } catch (err) {
    // if jwt expired
    api.dispatch(logout());
    return api.rejectWithValue(err);
  }
});