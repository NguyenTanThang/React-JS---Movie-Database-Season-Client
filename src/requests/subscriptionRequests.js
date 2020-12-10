import axios from "axios";
import {
    MAIN_PROXY_URL
} from "../config/config";
import {
    message
} from "antd";

const SUBSCRIPTIONS_URL = `${MAIN_PROXY_URL}/subscriptions`;

export const addSubscription = async (planID) => {
    try {
        const customerID = localStorage.getItem("userID");
        const res = await axios.post(`${SUBSCRIPTIONS_URL}/add`, {
            planID,
            customerID
        });
        console.log({planID, customerID});

        const sub = res.data.data;
        console.log(sub);

        return sub;
    } catch (error) {
        message.error(error.message, 5);
    }
}