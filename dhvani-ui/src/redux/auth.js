import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    isLoggedIn: false,
    token: null,
    isAdmin: false,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload.user;
            if (action.payload.token) state.token = action.payload.token;
            state.isLoggedIn = true;
            state.isAdmin = action.payload.user.isAdmin;
        },
        logout: (state) => {
            console.log(state);
            state.user = null;
            state.token = null;
            state.isLoggedIn = false;
            state.isAdmin = false;
        },
    },
});

// Action creators are generated for each case reducer function
export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;
