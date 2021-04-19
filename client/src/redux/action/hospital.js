import axios from "axios" 
//axios είναι για την χρήση των async/await 
//παίρνει/διαγράφει διευθύνσεις URL μέσω τις GET/DELETE 
import { set_alert } from './alert'

import {
    GET_HOSPITAL,
    HOSPITAL_ERROR,
 //   UPDATE_HOSPITAL,      ΔΕΝ ΧΡΗΣΙΜΟΠΟΙΕΊΤΑΙ ΓΙΑΤΙ ΕΙΝΑΙ ΣΥΜΠΤΙΓΜΕΝΑ ΟΛΑ ΣΕ ΜΙΑ ΣΥΝΑΡΤΗΣΗ 
    CLEAR_HOSPITAL,
    DELETE_HOSPITAL
}from  './Types';
//
//Get current users Hospital profile info
export const getCurrentHospital = () => async dispatch => { // () σημαίνει οτι είναι μια συνάρτηση κενή με καθόλου ορίσματα 
    try {
        const res = await axios.get('/hospital'); //ΕΓΙΝΕ ΑΛΛΑΓΗ ΑΠΟ ΤΟ ΠΡΟΤΥΠΟ /api/hospital/me

        dispatch({
            type: GET_HOSPITAL,
            payload: res.data //res = respond απο τον server 
        });
    }catch(err) {
        dispatch({
            type: HOSPITAL_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};


//Create or update hospital
//ΘΑ ΧΡΕΙΑΣΤΕΙ ΕΝΑ ΟΡΙΣΜΑ ID !!!!!! 
export const createHospital = (formData, history, edit = false) => async dispatch => {  //H edit μπαινει για να γνωρίζω αμα δημιουργω η κανω edit καποιο νοσοκομειο
    try {
     
     const res = await axios.post('/hospital',formData);    //η διαδρομή που παίρνει για να κάνει update η να δημιουργήσει το καινουργιο profile νοσοκομειου
                                                                        
     dispatch({
        type: GET_HOSPITAL,
        payload: res.data
     });
     //στην περίπτωση που έχουν γίνει edit τα στοιχεία του Hospital κάνει display το πρώτο αλλίως το δεύτερο
     dispatch(set_alert(edit ? 'Hospital Info Updated' : 'Hospital Created'));

    
     if(!edit){      //Αν δημιουργήσω ενα καινιούργιο νοσοκομείο θα πρέπει να κάνει redirect 
         history.push('/hospital');
     }

    } catch(err){
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

// Delete Hospital profile 
export const deleteHospital = () => async (dispatch) => {
    if (window.confirm('Are you sure? This can NOT be undone!')) {
      try {
        await api.delete('/hospital');
  
        dispatch({ type: CLEAR_HOSPITAL });
        dispatch({ type: DELETE_HOSPITAL });
  
        dispatch(setAlert('The hospitals account has been permanently deleted'));
      } catch (err) {
        dispatch({
          type: HOSPITAL_ERROR,
          payload: { msg: err.response.statusText, status: err.response.status }
        });
      }
    }
  };

