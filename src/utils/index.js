import {notification} from "antd";

export const createNotification = (type, config) => {
    return notification[type]({
        ...config,
        placement: "bottomRight",
        className: 'custom-notification-class',
        style: {
            backgroundColor: "#2b2b31",
            color: "#FFF"
        },
        duration: 10,
    });
}