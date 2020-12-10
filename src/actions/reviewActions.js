import axios from "axios";
import {MAIN_PROXY_URL} from "../config/config";
import {message} from "antd";
import {
    ADD_REVIEW,
    EDIT_REVIEW,
    GET_REVIEWS_BY_MOVIES_ID
} from "./types";   

const REVIEWS_URL = `${MAIN_PROXY_URL}/reviews`;

export const getReviewsByMovieID = (movieID) => {
    return async (dispatch) => {
        try {
            const res = await axios.get(`${REVIEWS_URL}/movieID/${movieID}`);
    
            const reviews = res.data.data;

            return dispatch({
                type: GET_REVIEWS_BY_MOVIES_ID,
                payload: {
                    reviews
                }
            })
        } catch (error) {
            message.error(error.message, 5);
        }
    }
}

export const addReview = (newReview) => {
    return async (dispatch) => {
        try {
            const {movieID, grading, customerID} = newReview;

            const res = await axios.post(`${REVIEWS_URL}/add`, {
                movieID, grading, customerID
            });
    
            const review = res.data.data;

            return dispatch({
                type: ADD_REVIEW,
                payload: {
                    review
                }
            })
        } catch (error) {
            message.error(error.message, 5);
        }
    }
}

export const editReview = (reviewID, updatedReview) => {
    return async (dispatch) => {
        try {
            const {movieID, grading, customerID} = updatedReview;

            const res = await axios.put(`${REVIEWS_URL}/edit/${reviewID}`, {
                movieID, grading, customerID
            });
    
            const review = res.data.data;

            return dispatch({
                type: EDIT_REVIEW,
                payload: {
                    review
                }
            })
        } catch (error) {
            message.error(error.message, 5);
        }
    }
}