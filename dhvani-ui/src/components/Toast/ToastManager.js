import Toast from "./index.js";

import { removeNotification } from "../../redux/notification";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

const ToastManager = () => {
    const notificationState = useSelector((state) => state.notification);
    const dispatch = useDispatch();

    const removeNotificationAfterDelay = (id) => (dispatch) => {
        setTimeout(() => {
            dispatch(removeNotification(id));
        }, 5000);
    };

    useEffect(() => {
        notificationState.notifications.forEach((notification) => {
            dispatch(removeNotificationAfterDelay(notification.id));
        });
    }, [dispatch, notificationState.notifications]);

    return (
        <div className="absolute right-0 w-full max-w-xs">
            {notificationState.notifications.map((nt) => (
                <Toast key={nt.id} show={true} message={nt.notification} />
            ))}
        </div>
    );
};

export default ToastManager;
