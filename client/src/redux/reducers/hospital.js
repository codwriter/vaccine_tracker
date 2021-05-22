import {
    GET_HOSPITAL,
    HOSPITAL_ERROR,
    CLEAR_HOSPITAL,
    UPDATE_HOSPITAL,
    GET_HOSPITALS,
  } from '../action/types';
  
  const initialState = {
    hospitals: null,
    hospital: null,
    loading: true,
    error: {}
  };
    
  function hospitalReducer(state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case GET_HOSPITAL:
      case UPDATE_HOSPITAL:
        return {
          ...state,
          hospital: payload,
          loading: false
        };
      case HOSPITAL_ERROR:
        return {
          ...state,
          error: payload,
          loading: false,
          hospital: null
        };
      case GET_HOSPITALS:
        return {
          ...state,
          hospitals: payload,
          loading: false
        };
      case CLEAR_HOSPITAL:
        return {
          ...state,
          hospital: null,
          loading: false
        };
      default:
        return state;
    }
  }
  export default hospitalReducer;
  