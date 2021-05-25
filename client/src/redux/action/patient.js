import api from '../../utils/api';
import { setAlert } from './alert';
import { getCurrentHospital } from './hospital';
import {
    GET_PATIENTS,
    GET_HOSPITAL_PATIENTS,
    GET_PATIENT,
    ADD_PATIENT,
    UPDATE_PATIENT,
    DELETE_PATIENT,
    PATIENT_ERROR,
    GET_HOSPITAL
} from './types';

// Get hospital patients  from Server
export const getHospitalPatients = () => async dispatch => {
    try {
        // Wait for the server response with the patients
        const res = await api.get('/patients/hospital');

        // Save it to payload
        dispatch({
            type: GET_HOSPITAL_PATIENTS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: PATIENT_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

// Get All patients  from Server
export const getPatients = () => async dispatch => {
    try {
        // Wait for the server response with the patients
        const res = await api.get('/patients');

        // Save it to payload
        dispatch({
            type: GET_PATIENTS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: PATIENT_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};
// Get patient
export const getPatient = id => async dispatch => {
    try {
        const res = await api.get(`/patients/${id}`);

        dispatch({
            type: GET_PATIENT,
            payload: res.data
        });

    } catch (err) {
        dispatch({
            type: PATIENT_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

// Add Patient 
export const addPatient = (formData) => async dispatch => {
    try {
        const res = await api.post('/patients/hospital', formData);

        dispatch({
            type: ADD_PATIENT,
            payload: res.data
        });

        dispatch(getCurrentHospital());
       
        dispatch(setAlert('Patient Created', 'success'));

    } catch (err) {
        const errors = err.response.data.errors;    //Σε περίπτωση που ξεχάσω καποια απο τα υποχρεωτικά πεδία θα μου βγάλει alert

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: PATIENT_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

// Update Patient
export const updatePatient = (id, formData) => async dispatch => {
    try {
        const res = await api.put(`/patients/${id}`, formData);

        dispatch({
            type: UPDATE_PATIENT,
            payload: { id, patient: res.data }
        });

        dispatch(setAlert('Patient Updated', 'success'));

    } catch (err) {
        const errors = err.response.data.errors;    //Σε περίπτωση που ξεχάσω καποια απο τα υποχρεωτικά πεδία θα μου βγάλει alert

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: PATIENT_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

// Remove patient
export const removePatient = id => async dispatch => {
    try {
        await api.delete(`/patients/${id}`);

        dispatch({
            type: DELETE_PATIENT,
            payload: id
        });

        dispatch(setAlert('Patient Removed', 'success'));

    } catch (err) {
        dispatch({
            type: PATIENT_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};