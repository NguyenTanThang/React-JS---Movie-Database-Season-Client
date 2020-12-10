import axios from "axios";
import {
    MAIN_PROXY_URL
} from "../config/config";
import {
    message
} from "antd";

const SEASON_URL = `${MAIN_PROXY_URL}/seasons`;

export const getSeasonByIDAxios = async (seasonID) => {
    try {
        const res = await axios.get(`${SEASON_URL}/${seasonID}`);

        const season = res.data.data;

        return season;
    } catch (error) {
        message.error(error.message, 5);
    }
}