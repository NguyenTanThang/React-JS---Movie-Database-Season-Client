import axios from "axios";
import {
    MAIN_PROXY_URL
} from "../config/config";
import {
    message
} from "antd";

const PHOTO_URL = `${MAIN_PROXY_URL}/photos`;

export const getPhotosByMovieID = async (movieID) => {
    try {
        const res = await axios.get(`${PHOTO_URL}/movieID/${movieID}`);

        const photos = res.data.data;

        return photos;
    } catch (error) {
        console.log(error);
        message.error(error.message, 5);
    }
}

export const getPhotosBySeriesID = async (seriesID) => {
    try {
        const res = await axios.get(`${PHOTO_URL}/seriesID/${seriesID}`);

        const photos = res.data.data;

        return photos;
    } catch (error) {
        console.log(error);
        message.error(error.message, 5);
    }
}


export const getPhotosBySeasonID = async (seasonID) => {
    try {
        const res = await axios.get(`${PHOTO_URL}/seasonID/${seasonID}`);

        const photos = res.data.data;

        return photos;
    } catch (error) {
        console.log(error);
        message.error(error.message, 5);
    }
}


