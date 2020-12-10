import {
    GET_WATCH_LATER_BY_CUSTOMERID,
} from "../actions/types";

const initialState = {
    watchLater: []
}

const watchLaterReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_WATCH_LATER_BY_CUSTOMERID:
            return {
                ...state,
                watchLater: action.payload.watchLater
            }
            break;
        default:
            return state;
            break;
    }
}

export default watchLaterReducer;