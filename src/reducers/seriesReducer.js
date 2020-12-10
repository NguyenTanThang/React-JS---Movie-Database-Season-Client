import {
    GET_ALL_SERIES,
} from "../actions/types";

const initialState = {
    series: []
}

const seriesReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_SERIES:
            return {
                ...state,
                series: action.payload.series
            }
            break;
        default:
            return state;
            break;
    }
}

export default seriesReducer;