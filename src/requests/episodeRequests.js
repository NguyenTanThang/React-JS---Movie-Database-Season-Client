import axios from "axios";
import {
    MAIN_PROXY_URL
} from "../config/config";
import {
    message
} from "antd";

const EPISODES_URL = `${MAIN_PROXY_URL}/episodes`;

export const getEpisodesBySeriesIDAxios = async (seriesID) => {
    try {
        const res = await axios.get(`${EPISODES_URL}/seriesID/${seriesID}`);

        const episodes = res.data.data;

        return episodes;
    } catch (error) {
        message.error(error.message, 5);
    }
}

export const getEpisodesBySeasonIDAxios = async (seasonID) => {
    try {
        const res = await axios.get(`${EPISODES_URL}/seasonID/${seasonID}`);

        const episodes = res.data.data;

        return episodes;
    } catch (error) {
        message.error(error.message, 5);
    }
}