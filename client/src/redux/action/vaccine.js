import api from '../../utils/api';
import { setAlert } from './alert';
import {
    GET_VACCINES,
    GET_VACCINE,
    ADD_VACCINE,
    UPDATE_VACCINE,
    REMOVE_VACCINE,
    VACCINE_ERROR
} from './types';

// Get vaccines from server
export const getVaccines = () => async dispatch => {
    try {
        const res = await api.get('/hospital/vaccines');
        dispatch({
            type: GET_VACCINES,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: VACCINE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

export const getVaccine = id => async dispatch => {
    try {
        const res = await api.get(`/hospital/vaccines/${id}`);
        dispatch({
            type: GET_VACCINE,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: VACCINE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

// Add Vaccine 
export const addVaccine = (formdata) => async dispatch => {
    try {
        const res = await api.put('/hospital/vaccines',formdata);

        dispatch({
            type: ADD_VACCINE,
            payload: res.data
        });

        dispatch(setAlert('Vaccine Created', 'success'));

    } catch (err) {
        dispatch({
            type: VACCINE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};


// Update vaccine
export const updateVaccine = (id,formdata) => async dispatch => {
    try {
        const res = await api.put(`/hospital/vaccines/${id}`,formdata);

        dispatch({
            type: UPDATE_VACCINE,
            payload: { id, vaccine: res.data }
        });

    } catch (err) {
        dispatch({
            type: VACCINE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

// Remove vaccine
export const removeVaccine = id => async dispatch => {
    try {
        await api.delete(`/hospital/vaccines/${id}`);

        dispatch({
            type: REMOVE_VACCINE,
            payload: id
        });

        dispatch(setAlert('Vaccine Removed', 'success'));

    } catch (err) {
        dispatch({
            type: VACCINE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};