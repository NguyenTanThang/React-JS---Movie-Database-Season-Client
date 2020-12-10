import axios from "axios";
import {MAIN_PROXY_URL} from "../config/config";
import {message} from "antd";
import {
    LOGIN,
    SIGNUP
} from "./types";   

const CUSTOMERS_URL = `${MAIN_PROXY_URL}/customers`;

export const login = (email, password) => {
    return async (dispatch) => {
        try {
            message.loading("Logging in...", 0);
            const res = await axios.post(`${CUSTOMERS_URL}/login`, {
                email, password
            });

            const customer = res.data.data;

            message.destroy();
            message.success("Successfully logged in", 5);

            return dispatch({
                type: LOGIN,
                payload: {
                    customer
                }
            })
        } catch (error) {
            message.error(error.message, 5);
        }
    }
}

export const signup = (email, password) => {
    return async (dispatch) => {
        try {
            message.loading("Signing up...", 0);
            const res = await axios.post(`${CUSTOMERS_URL}/sign-up`, {
                email, password
            });

            const customer = res.data.data;

            message.destroy();
            message.success("Successfully signed up", 5);

            return dispatch({
                type: SIGNUP,
                payload: {
                    customer
                }
            })
        } catch (error) {
            message.error(error.message, 5);
        }
    }
}