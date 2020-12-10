import {
    SET_LOADING,
    CLEAR_LOADING
} from "./types";   

export const setLoading = () => {
    console.log("setLoading")
    return {
        type: SET_LOADING
    }
}

export const clearLoading = () => {
    console.log("clearLoading")
    return {
        type: CLEAR_LOADING
    }
}