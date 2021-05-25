import {
    GET_VACCINES,
    GET_VACCINE,
    ADD_VACCINE,
    UPDATE_VACCINE,
    REMOVE_VACCINE,
    VACCINE_ERROR
} from '../action/types';

const initialState = {
    vaccines: [],
    vaccine: null,
    loading: true,
    error: {}
};

function vaccineReducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_VACCINES:
            return {
                ...state,
                vaccines: payload,
                loading: false
            };
        case GET_VACCINE:
            return {
                ...state,
                vaccine: payload,
                loading: false
            };
        case ADD_VACCINE:
            return {
                ...state,
                vaccines: payload,
                loading: false
            };
        case UPDATE_VACCINE:
            return {
                ...state,
                vaccines: state.vaccines.map((vaccine) =>
                    vaccine._id === payload.id ? vaccine = payload.vaccine : vaccine
                ),
                loading: false
            };
        case REMOVE_VACCINE:
            return {
                ...state,
                vaccines: state.vaccines.filter((vaccine) => vaccine._id !== payload),
                loading: false
            };
        case VACCINE_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            };
        default:
            return state;
    }
}
export default vaccineReducer;