import axios from "axios";
import {MAIN_PROXY_URL} from "../config/config";
import {message} from "antd";
import {
    GET_WATCH_HISTORY_BY_CUSTOMERID,
} from "./types";   
import {
    getCurrentUser
} from '../requests/authRequests';
import {
    setLoading,
    clearLoading
} from "./loadingActions";

const WATCH_HISTORY_URL = `${MAIN_PROXY_URL}/watch-history`;

export const getAllWatchHistoryByCustomerID = () => {
    return async (dispatch) => {
        try {
            dispatch(setLoading());

            const userID = getCurrentUser();
            const res = await axios.get(`${WATCH_HISTORY_URL}/customerID/${userID}`);
    
            const watchHistory = res.data.data;

            dispatch(clearLoading());

            return dispatch({
                type: GET_WATCH_HISTORY_BY_CUSTOMERID,
                payload: {
                    watchHistory
                }
            })
        } catch (error) {
            message.error(error.message, 5);
        }
    }
}