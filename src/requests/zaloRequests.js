import axios from "axios";
import {
    MAIN_PROXY_URL
} from "../config/config";
import {
    message
} from "antd";

const ZALOS_URL = `${MAIN_PROXY_URL}/zalos`;

export const getZaloPayURL = async (customerID, obj) => {
    try {
        const {amount, planID} = obj;

        const res = await axios.get(`${ZALOS_URL}/amount/${amount}/customerID/${customerID}/planID/${planID}`);

        const orderUrl = res.data.order_url;

        return orderUrl;
    } catch (error) {
        message.error(error.message, 5);
        console.log(error);
    }
}

export const getZaloPayGatewayURL = async (customerID, obj) => {
    try {
        const {amount, planID} = obj;

        const res = await axios.get(`${ZALOS_URL}/gateway/amount/${amount}/customerID/${customerID}/planID/${planID}`);

        const orderUrl = res.data.order_url;

        return orderUrl;
    } catch (error) {
        message.error(error.message, 5);
        console.log(error);
    }
}