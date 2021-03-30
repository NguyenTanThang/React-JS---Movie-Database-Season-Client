import axios from "axios";
import {
    MAIN_PROXY_URL
} from "../config/config";
import {
    message
} from "antd";

const CUSTOMER_URL = `${MAIN_PROXY_URL}/customers`;

export const getResetPasswordToken = async (token) => {
    try {
        const res = await axios.get(`${CUSTOMER_URL}/reset-password-token/${token}`);

        if (!res.data.success) {
            message.error(res.data.message);
            let mockedCustomer = null;
            return mockedCustomer;
        }

        const customer = res.data.data;

        return customer;
    } catch (error) {
        message.error(error.message, 5);
    }
}