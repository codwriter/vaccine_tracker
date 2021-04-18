import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import patientReducer from './patient';

export default combineReducers({
    alert,
    auth,
    patientReducer
});
