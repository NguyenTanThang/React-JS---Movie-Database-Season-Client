import {
    ADD_REVIEW,
    EDIT_REVIEW,
    GET_REVIEWS_BY_MOVIES_ID
} from "../actions/types";

const initialState = {
    reviews: []
}

const reviewsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_REVIEWS_BY_MOVIES_ID:
            return {
                ...state,
                reviews: action.payload.reviews
            }
            break;
        case ADD_REVIEW:
            return {
                ...state,
                reviews: [...state.reviews, action.payload.review]
            }
            break;
        case EDIT_REVIEW:
            return {
                ...state,
                reviews: state.reviews.map(review => {
                    console.log("review");
                    console.log(review);
                    console.log("action.payload.review");
                    console.log(action.payload.review);
                    console.log("review.customerID === action.payload.review.customerID");
                    console.log(review.customerID === action.payload.review.customerID);
                    if (review.customerID === action.payload.review.customerID) {
                        return action.payload.review;
                    }
                    return review;
                })
            }
            break;
        default:
            return state;
            break;
    }
}

export default reviewsReducer;