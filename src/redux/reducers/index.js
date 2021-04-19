import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import patientReducer from './patient';
import vaccineReducer from './vaccine';

export default combineReducers({
    alert,
    auth,
    patientReducer,
    vaccineReducer
});
