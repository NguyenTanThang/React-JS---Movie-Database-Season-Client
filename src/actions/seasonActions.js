import axios from "axios";
import {MAIN_PROXY_URL} from "../config/config";
import {message} from "antd";
import {
    GET_SEASONS_BY_SERIES_ID,
} from "./types";   
import {
    setLoading,
    clearLoading
} from "./loadingActions";

const SEASON_URL = `${MAIN_PROXY_URL}/seasons`;

export const getSeasonsBySeriesID = (seriesID) => {
    return async (dispatch) => {
        try {
            dispatch(setLoading());
            const res = await axios.get(`${SEASON_URL}/seriesID/${seriesID}`);
    
            const seasons = res.data.data;

            dispatch(clearLoading());
            return dispatch({
                type: GET_SEASONS_BY_SERIES_ID,
                payload: {
                    seasons
                }
            })
        } catch (error) {
            message.error(error.message, 5);
        }
    }
}