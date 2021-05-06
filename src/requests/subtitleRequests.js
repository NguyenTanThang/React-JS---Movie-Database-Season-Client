import axios from "axios";
import {
    MAIN_PROXY_URL
} from "../config/config";
import {
    message
} from "antd";

const SUB_URL = `${MAIN_PROXY_URL}/subtitles`;

export const getSubtitlesByMovieID = async (movieID) => {
    try {
        const res = await axios.get(`${SUB_URL}/movieID/${movieID}`);

        const subtitles = res.data.data;

        return subtitles;
    } catch (error) {
        console.log(error);
        message.error(error.message, 5);
    }
}

export const getSubtitlesByEpisodeID = async (episodeID) => {
    try {
        const res = await axios.get(`${SUB_URL}/episodeID/${episodeID}`);

        const subtitles = res.data.data;

        return subtitles;
    } catch (error) {
        message.error(error.message, 5);
    }
}
