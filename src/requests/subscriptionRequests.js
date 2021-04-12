import axios from "axios";
import {
    MAIN_PROXY_URL
} from "../config/config";
import {
    message
} from "antd";
import {
    authenticationService
} from "../_services";

const SUBSCRIPTIONS_URL = `${MAIN_PROXY_URL}/subscriptions`;

export const addSubscription = async (planID) => {
    try {
        const currentUser = authenticationService.currentUserValue;
        const currentCustomer = currentUser.customerItem;
        const res = await axios.post(`${SUBSCRIPTIONS_URL}/add`, {
            planID,
            customerID: currentCustomer._id
        });

        const sub = res.data.data;

        return sub;
    } catch (error) {
        message.error(error.message, 5);
    }
}