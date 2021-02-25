import axios from "axios";
import {MAIN_PROXY_URL} from "../config/config";
import {message} from "antd";
import {
    GET_WATCH_LATER_BY_CUSTOMERID,
} from "./types";   
import {
    authenticationService
} from "../_services";
import {
    setLoading,
    clearLoading
} from "./loadingActions";

const WATCH_LATER_URL = `${MAIN_PROXY_URL}/watch-laters`;

export const getAllWatchLaterByCustomerID = () => {
    return async (dispatch) => {
        try {
            dispatch(setLoading());

            const currentUser = authenticationService.currentUserValue;
            const userID = currentUser.customerItem._id;
            const res = await axios.get(`${WATCH_LATER_URL}/customerID/${userID}`);
    
            const watchLater = res.data.data;

            dispatch(clearLoading());

            return dispatch({
                type: GET_WATCH_LATER_BY_CUSTOMERID,
                payload: {
                    watchLater
                }
            })
        } catch (error) {
            message.error(error.message, 5);
        }
    }
}