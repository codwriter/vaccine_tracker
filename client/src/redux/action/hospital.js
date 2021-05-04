//axios είναι για την χρήση των async/await 
//παίρνει/διαγράφει διευθύνσεις URL μέσω τις GET/DELETE 
import api from '../../utils/api';
import { setAlert } from './alert';
import {
  GET_HOSPITAL,
  HOSPITAL_ERROR,
  UPDATE_HOSPITAL,
  CLEAR_HOSPITAL,
  DELETE_HOSPITAL
} from './types';
//
//Get current users Hospital profile info
export const getCurrentHospital = () => async dispatch => { // () σημαίνει οτι είναι μια συνάρτηση κενή με καθόλου ορίσματα 
  try {
    const res = await api.get('/hospital/profile'); //ΕΓΙΝΕ ΑΛΛΑΓΗ ΑΠΟ ΤΟ ΠΡΟΤΥΠΟ /api/hospital/me

    dispatch({
      type: GET_HOSPITAL,
      payload: res.data //res = respond απο τον server 
    });
  } catch (err) {
    dispatch({
      type: HOSPITAL_ERROR,
      payload: err/* { msg: err.response.statusText, status: err.response.status } PROVLIMA SE SERVER */
    });
  }
};

//Create or update hospital
//ΘΑ ΧΡΕΙΑΣΤΕΙ ΕΝΑ ΟΡΙΣΜΑ ID !!!!!! 
export const createHospital = (formData, history) => async dispatch => {  //H edit μπαινει για να γνωρίζω αμα δημιουργω η κανω edit καποιο νοσοκομειο
  try {

    const res = await api.post('/hospital', formData);    //η διαδρομή που παίρνει για να κάνει update η να δημιουργήσει το καινουργιο profile νοσοκομειου

    dispatch({
      type: GET_HOSPITAL,
      payload: res.data
    });
    //στην περίπτωση που έχουν γίνει edit τα στοιχεία του Hospital κάνει display το πρώτο αλλίως το δεύτερο
    dispatch(setAlert('Hospital Created'));

    //Αν δημιουργήσω ενα καινιούργιο νοσοκομείο θα πρέπει να κάνει redirect 
    history.push('/hospital');

  } catch (err) {
    const errors = err.response.data.errors;    //Σε περίπτωση που ξεχάσω καποια απο τα υποχρεωτικά πεδία θα μου βγάλει alert

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: HOSPITAL_ERROR,
      payload: err/* { msg: err.response.statusText, status: err.response.status } PROVLIMA SE SERVER */
    });
  }
}

export const updateHospital = (formdata) => async (dispatch) => {
  try {
    const res = await api.put('/hospital/profile', formdata);

    dispatch(setAlert('Hospital Updated'));

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
      payload: err/* { msg: err.response.statusText, status: err.response.status } PROVLIMA SE SERVER */
    });
  }
}

// Delete Hospital profile 
export const deleteHospital = () => async (dispatch) => {
  if (window.confirm('Are you sure? This can NOT be undone!')) {
    try {
      await api.delete('/hospital');

      dispatch({ type: CLEAR_HOSPITAL });
      dispatch({ type: DELETE_HOSPITAL });

      dispatch(setAlert('The hospitals profile has been permanently deleted'));
    } catch (err) {
      dispatch({
        type: HOSPITAL_ERROR,
        payload: err/* { msg: err.response.statusText, status: err.response.status } PROVLIMA SE SERVER */
      });
    }
  }
};

/* //Δεν έχω ιδέα για τα αποτελέσματα του παρακάτω κώδικα 
// Get hospital by user ID
export const getHospitalById = (userId) => async (dispatch) => {
  try {
    const res = await api.get(`/hospital/user/${userId}`);

    dispatch({
      type: GET_HOSPITAL,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: HOSPITAL_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
 */
