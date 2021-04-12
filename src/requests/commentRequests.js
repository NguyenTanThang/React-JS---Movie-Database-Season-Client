import axios from "axios";
import {
    MAIN_PROXY_URL
} from "../config/config";
import {
    message
} from "antd";

const COMMENTS_URL = `${MAIN_PROXY_URL}/comments`;

export const getCommentsByMovieID = async (movieID) => {
    try {
        const res = await axios.get(`${COMMENTS_URL}/movieID/${movieID}`);

        const comments = res.data.data;

        return comments;
    } catch (error) {
        message.error(error.message, 5);
    }
}

export const addComment = async ({customerID, movieSeriesID, content}) => {
    try {
        message.loading("Creating your comment...", 0);

        const res = await axios.post(`${COMMENTS_URL}/add`, {
            customerID, movieSeriesID, content
        });

        message.destroy();
        message.success("Successfully added", 5);

        const comment = res.data.data;

        return comment;
    } catch (error) {
        message.error(error.message, 5);
    }
}

export const deleteComment = async (commentID) => {
    try {
        message.loading("Deleting your comment...", 0);

        const res = await axios.delete(`${COMMENTS_URL}/delete/${commentID}`);

        if (res.data.success) {
            message.destroy();
            message.success("Successfully deleted", 5);
            const comment = res.data.data;
            return comment;
        }

        message.destroy();
        return message.error(res.data.message, 5);
    } catch (error) {
        message.error(error.message, 5);
    }
}