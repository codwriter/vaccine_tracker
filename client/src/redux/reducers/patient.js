import {
    GET_PATIENT,
    GET_HOSPITAL_PATIENTS,
    GET_PATIENTS,
    ADD_PATIENT,
    UPDATE_PATIENT,
    DELETE_PATIENT,
    PATIENT_ERROR
} from '../action/types';

const initialState = {
    patients: [],
    patient: null,
    loading: true,
    error: {}
};

function patientReducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_PATIENTS:
        case GET_HOSPITAL_PATIENTS:
            return {
                ...state,
                patients: payload,
                loading: false
            };
        case GET_PATIENT:
            return {
                ...state,
                patient: payload,
                loading: false
            };
        case ADD_PATIENT:
            return {
                ...state,
                patients: [payload, ...state.patients],
                loading: false
            };
        case UPDATE_PATIENT:
            return {
                ...state,
                patients: state.patients.map((patient) =>
                    patient._id === payload.id ? patient = payload.patient  : patient
                ),
                loading: false
            };
        case DELETE_PATIENT:
            return {
                ...state,
                patients: state.patients.filter((patient) => patient._id !== payload),
                loading: false
            };
        case PATIENT_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            };
        default:
            return state;
    }
}
    export default patientReducer;