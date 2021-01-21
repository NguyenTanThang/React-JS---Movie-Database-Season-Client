import axios from "axios";
import {
    MAIN_PROXY_URL
} from "../config/config";
import {
    message
} from "antd";

const WATCH_HISTORY_URL = `${MAIN_PROXY_URL}/watch-history`;

export const getWatchHistoryByCustomerIDAndMovieID = async (customerID, movieID) => {
    try {
        const res = await axios.get(`${WATCH_HISTORY_URL}/customerID/${customerID}/movieID/${movieID}`);

        const watchHistory = res.data.data;

        return watchHistory;
    } catch (error) {
        message.error(error.message, 5);
    }
}

export const getWatchHistoryByCustomerID = async (customerID) => {
    try {
        const res = await axios.get(`${WATCH_HISTORY_URL}/customerID/${customerID}`);

        const watchHistory = res.data.data;

        return watchHistory;
    } catch (error) {
        message.error(error.message, 5);
    }
}

export const addWatchHistory = async (customerID, movieID) => {
    try {
        //message.loading("Adding to your watch history list", 0);

        const res = await axios.post(`${WATCH_HISTORY_URL}/add`, {
            customerID, movieID
        });

        //message.destroy();
        //message.success("Successfully added", 5);

        const watchHistory = res.data.data;

        return watchHistory;
    } catch (error) {
        console.log(error);
        message.error(error.message, 5);
    }
}

export const deleteWatchHistory = async (customerID, movieID) => {
    try {
        //message.loading("Removing from your watch history list", 0);

        const watchHistoryItem = await getWatchHistoryByCustomerIDAndMovieID(customerID, movieID);
        if (!watchHistoryItem) {
            return watchHistoryItem;
        }
        const res = await axios.delete(`${WATCH_HISTORY_URL}/delete/${watchHistoryItem._id}`);

        //message.destroy();
        //message.success("Successfully removed", 5);

        const watchHistory = res.data.data;

        return watchHistory;
    } catch (error) {
        console.log(error);
        message.error(error.message, 5);
    }
}