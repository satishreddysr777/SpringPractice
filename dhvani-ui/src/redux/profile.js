import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    error: false,
    message: null,
    data: null,
};

export const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        getMyProfileAction: (state, action) => {
            const { type, data } = action.payload;
            if (type === "init") {
                state.loading = true;
                state.error = false;
                state.message = null;
                state.data = null;
            } else if (type === "success") {
                state.loading = false;
                state.data = data;
            } else {
                state.loading = false;
                state.error = true;
                state.message = data;
            }
        },
    },
});

export const { getMyProfileAction } = profileSlice.actions;

export default profileSlice.reducer;
