import axios from "axios";
import {MAIN_PROXY_URL} from "../config/config";
import {message} from "antd";
import {
    GET_ALL_SERIES,
} from "./types";   
import {
    setLoading,
    clearLoading
} from "./loadingActions";

const SERIES_URL = `${MAIN_PROXY_URL}/series`;

export const getAllSeries = () => {
    return async (dispatch) => {
        try {
            dispatch(setLoading());
            const res = await axios.get(SERIES_URL);
    
            const series = res.data.data;

            dispatch(clearLoading());
            return dispatch({
                type: GET_ALL_SERIES,
                payload: {
                    series
                }
            })
        } catch (error) {
            message.error(error.message, 5);
        }
    }
}