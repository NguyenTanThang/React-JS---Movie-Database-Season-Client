import axios from "axios";
import {
    MAIN_PROXY_URL
} from "../config/config";
import {
    message
} from "antd";

const REVIEW_URL = `${MAIN_PROXY_URL}/reviews`;

export const getReviewByCustomerIDAndMovieIDAxios = async (movieID, customerID) => {
    try {
        const res = await axios.get(`${REVIEW_URL}/movieID/${movieID}/customerID/${customerID}`);

        const review = res.data.data;

        return review;
    } catch (error) {
        message.error(error.message, 5);
    }
}

export const addRating = async ({customerID, movieID, grading}) => {
    try {
        message.loading("Sending your ratings...", 0);

        const res = await axios.post(`${REVIEW_URL}/add`, {
            customerID, movieID, grading
        });

        message.destroy();
        message.success("Successfully added. Please reload to update the rating", 5);

        const review = res.data.data;

        return review;
    } catch (error) {
        message.error(error.message, 5);
    }
}

export const editRating = async (reviewID, {customerID, movieID, grading}) => {
    try {
        message.loading("Sending your ratings...", 0);

        const res = await axios.put(`${REVIEW_URL}/edit/${reviewID}`, {
            customerID, movieID, grading
        });

        message.destroy();
        message.success("Successfully added. Please reload to update the rating", 5);

        const review = res.data.data;

        return review;
    } catch (error) {
        message.error(error.message, 5);
    }
}