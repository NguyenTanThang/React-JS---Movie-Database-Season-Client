import axios from "axios";
import {MAIN_PROXY_URL} from "../config/config";
import {message} from "antd";
import {
    GET_ALL_PLANS,
} from "./types";   

const PLANS_URL = `${MAIN_PROXY_URL}/plans`;

export const getAllPlans = () => {
    return async (dispatch) => {
        try {
            const res = await axios.get(PLANS_URL);
    
            const plans = res.data.data;

            return dispatch({
                type: GET_ALL_PLANS,
                payload: {
                    plans
                }
            })
        } catch (error) {
            message.error(error.message, 5);
        }
    }
}