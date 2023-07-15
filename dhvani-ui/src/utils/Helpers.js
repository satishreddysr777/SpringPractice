import { addNotification, removeNotification } from "../redux/notification";

const AddNotification = (id, data, dispatch) => {
    const { type, message } = data;
    dispatch(
        addNotification({
            id: id,
            type: type,
            notification: message,
        })
    );
};

const RemoveNotification = (id, dispatch) => {
    dispatch(removeNotification(id));
};

const ProcessNotification = (data, dispatch) => {
    let id = Date.now();

    AddNotification(id, data, dispatch);

    setTimeout(() => {
        RemoveNotification(id, dispatch);
    }, 5000);
};

export { ProcessNotification };
