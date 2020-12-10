import movieReducer from "./movieReducer";
import seriesReducer from "./seriesReducer";
import seasonReducer from "./seasonReducer";
import genreReducer from "./genreReducer";
import reviewReducer from "./reviewReducer";
import planReducer from "./planReducer";
import loadingReducer from "./loadingReducer";
import watchLaterReducer from "./watchLaterReducer";
import watchHistoryReducer from "./watchHistoryReducer";
import {combineReducers} from "redux";

const rootReducer = combineReducers({
    movieReducer,
    seriesReducer,
    seasonReducer,
    genreReducer,
    reviewReducer,
    planReducer,
    loadingReducer,
    watchLaterReducer,
    watchHistoryReducer
})

export default rootReducer;