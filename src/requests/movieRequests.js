import axios from "axios";
import {
    MAIN_PROXY_URL
} from "../config/config";
import {
    message
} from "antd";

const MOVIE_URL = `${MAIN_PROXY_URL}/movies`;

export const getMovieByIDAxios = async (movieID) => {
    try {
        const res = await axios.get(`${MOVIE_URL}/${movieID}`);

        const movie = res.data.data;

        return movie;
    } catch (error) {
        console.log(error);
        message.error(error.message, 5);
    }
}

export const getMoviesByGenre = async (genre) => {
    try {
        const res = await axios.get(`${MOVIE_URL}/genre/${genre}`);

        const movies = res.data.data;

        return movies;
    } catch (error) {
        message.error(error.message, 5);
    }
}