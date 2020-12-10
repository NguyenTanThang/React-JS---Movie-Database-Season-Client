import axios from "axios";
import {
    MAIN_PROXY_URL
} from "../config/config";
import {
    message
} from "antd";

const PLANS_URL = `${MAIN_PROXY_URL}/plans`;

export const getPlanByPrice = async (price) => {
    try {
        const res = await axios.get(`${PLANS_URL}/price?price=${price}`);

        const plan = res.data.data;

        return plan;
    } catch (error) {
        message.error(error.message, 5);
    }
}