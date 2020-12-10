import axios from "axios";
import {
    MAIN_PROXY_URL
} from "../config/config";
import {
    message
} from "antd";

const SERIES_URL = `${MAIN_PROXY_URL}/series`;

export const getSeriesByIDAxios = async (seriesID) => {
    try {
        const res = await axios.get(`${SERIES_URL}/${seriesID}`);

        const series = res.data.data;

        return series;
    } catch (error) {
        message.error(error.message, 5);
    }
}