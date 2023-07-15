import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    notifications: [],
};

export const notificationsSlice = createSlice({
    name: "notifications",
    initialState,
    reducers: {
        addNotification: (state, action) => {
            let notification = action.payload.notification;
            let type = action.payload.type;
            let obj = {
                id: Date.now(),
                type: type,
                notification: notification,
            };
            state.notifications.push(obj);
        },
        removeNotification: (state, action) => {
            let id = action.payload;
            state.notifications = state.notifications.filter(
                (item) => item.id != id
            );
        },
    },
});

export const { addNotification, removeNotification } =
    notificationsSlice.actions;

export default notificationsSlice.reducer;
