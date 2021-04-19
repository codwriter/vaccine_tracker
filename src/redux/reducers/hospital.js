import {
    GET_HOSPITAL,
    HOSPITAL_ERROR,
    CLEAR_HOSPITAL,
    UPDATE_HOSPITAL,
    DELETE_HOSPITAL
  } from '../action/Types';
  
  const initialState = {
    hospital: null,
    loading: true,
    error: {}
  };
  //
  
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
      case CLEAR_HOSPITAL:
        return {
          ...state,
          hospital: null,
        };
      default:
        return state;
    }
  }
  //
  export default hospitalReducer;
  