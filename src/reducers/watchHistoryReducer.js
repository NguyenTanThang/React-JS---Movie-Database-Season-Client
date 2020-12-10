import {
    GET_WATCH_HISTORY_BY_CUSTOMERID,
} from "../actions/types";

const initialState = {
    watchHistory: []
}

const watchHistoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_WATCH_HISTORY_BY_CUSTOMERID:
            return {
                ...state,
                watchHistory: action.payload.watchHistory
            }
            break;
        default:
            return state;
            break;
    }
}

export default watchHistoryReducer;