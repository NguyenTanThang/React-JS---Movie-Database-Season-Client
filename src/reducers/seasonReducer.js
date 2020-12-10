import {
    GET_SEASONS_BY_SERIES_ID,
} from "../actions/types";

const initialState = {
    seasons: []
}

const seasonReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_SEASONS_BY_SERIES_ID:
            return {
                ...state,
                seasons: action.payload.seasons
            }
            break;
        default:
            return state;
            break;
    }
}

export default seasonReducer;