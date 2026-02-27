import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface AuthState {
    token: string | null;
    isAuthenticated: boolean
}

const initialState: AuthState = {
    token: localStorage.getItem('adminToken'),
    isAuthenticated: !!localStorage.getItem('adminToken')
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
            state.isAuthenticated = true;
            localStorage.setItem('adminToken', action.payload);
        },
        logout: (state) => {
            state.token = null;
            state.isAuthenticated = false;
            localStorage.removeItem('adminToken')
        }
    }
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;