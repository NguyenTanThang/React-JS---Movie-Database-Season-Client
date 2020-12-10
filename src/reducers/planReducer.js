import {
    GET_ALL_PLANS,
} from "../actions/types";

const initialState = {
    plans: []
}

const plansReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_PLANS:
            return {
                ...state,
                plans: action.payload.plans
            }
            break;
        default:
            return state;
            break;
    }
}

export default plansReducer;