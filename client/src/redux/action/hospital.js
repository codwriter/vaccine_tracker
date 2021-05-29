//axios είναι για την χρήση των async/await 
//παίρνει/διαγράφει διευθύνσεις URL μέσω τις GET/DELETE 
import api from '../../utils/api';
import { setAlert } from './alert';
import {
  GET_HOSPITAL,
  GET_HOSPITALS,
  HOSPITAL_ERROR,
  UPDATE_HOSPITAL,
  CLEAR_HOSPITAL,
  PATIENT_CLEAR,
  VACCINE_CLEAR,
} from './types';

//Get current users Hospital profile info
export const getCurrentHospital = () => async dispatch => { // () σημαίνει οτι είναι μια συνάρτηση κενή με καθόλου ορίσματα 
  try {
    const res = await api.get('/hospital/me'); //ΕΓΙΝΕ ΑΛΛΑΓΗ ΑΠΟ ΤΟ ΠΡΟΤΥΠΟ /api/hospital/me

    dispatch({
      type: GET_HOSPITAL,
      payload: res.data //res = respond απο τον server 
    });
  } catch (err) {
    dispatch({
      type: HOSPITAL_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//Create or update hospital
//ΘΑ ΧΡΕΙΑΣΤΕΙ ΕΝΑ ΟΡΙΣΜΑ ID !!!!!! 
export const createHospital = (formData, history) => async (dispatch) => {  //H edit μπαινει για να γνωρίζω αμα δημιουργω η κανω edit καποιο νοσοκομειο
  try {

    const res = await api.post('/hospital', formData);    //η διαδρομή που παίρνει για να κάνει update η να δημιουργήσει το καινουργιο profile νοσοκομειου

    dispatch({
      type: GET_HOSPITAL,
      payload: res.data
    });
    //στην περίπτωση που έχουν γίνει edit τα στοιχεία του Hospital κάνει display το πρώτο αλλίως το δεύτερο
    dispatch(setAlert('Hospital Created', 'success'));

    //Αν δημιουργήσω ενα καινιούργιο νοσοκομείο θα πρέπει να κάνει redirect 
    history.push('/vaccines');

  } catch (err) {
    const errors = err.response.data.errors;    //Σε περίπτωση που ξεχάσω καποια απο τα υποχρεωτικά πεδία θα μου βγάλει alert

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: HOSPITAL_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
}

export const updateHospital = (formdata) => async (dispatch) => {
  try {
    const res = await api.put('/hospital/me', formdata);

    dispatch(setAlert('Hospital Updated', 'success'));

    dispatch({
      type: UPDATE_HOSPITAL,
      payload: res.data
    });
  } catch (err) {
    const errors = err.respanse.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: HOSPITAL_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
}

//GET ALL HOSPITALS
export const getHospitals = () => async (dispatch) => {

  try {
    const res = await api.get('/hospital/');

    dispatch({
      type: GET_HOSPITALS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: HOSPITAL_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//LINK HOSPITAL
export const linkHospital = (id, history) => async (dispatch) => {
  try {
    const res = await api.put(`/hospital/link/${id}`);

    dispatch({
      type: GET_HOSPITAL,
      payload: res.data
    });

    dispatch(setAlert('User linked to hospital!', 'success'));
    history.push('/dashboard');
  } catch (err) {
    console.log(err);
    dispatch({
      type: HOSPITAL_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//UNLINK HOSPITAL
export const unlinkHospital = () => async (dispatch) => {
  try {
    await api.put('/hospital/unlink');

    dispatch({
      type: CLEAR_HOSPITAL,
    });
    dispatch({
      type: PATIENT_CLEAR,
    });
    dispatch({
      type: VACCINE_CLEAR,
    });
    dispatch(setAlert('User unlinked from Hospital', 'success'));
  } catch (err) {
    dispatch({
      type: HOSPITAL_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};