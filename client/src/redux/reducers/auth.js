import { USER_LOADED, REGISTER_SUCCESS, LOGIN_SUCCESS, AUTH_ERROR, LOGOUT, DELETE_USER } from '../action/types';

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null
}

function authReducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: payload
            };
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: false
            }
        case AUTH_ERROR:
        case LOGOUT:
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                user: null
            };
        case DELETE_USER:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false
            }
        default:
            return state;
    }

}
export default authReducer;