// src/redux/reducer.js
import { 
    UPLOAD_FILE_INIT, 
    UPLOAD_FILE_SUCCESS, 
    UPLOAD_FILE_FAILURE, 
    CANCEL_UPLOAD, 
    SHOW_SNACKBAR, 
    HIDE_SNACKBAR 
  } from '../types/UploadTypes';
  
  const initialState = {
    isLoading: false,
    message: "",
    error: null,
    file: null,
    snackbar: {
      open: false,
      message: "",
      severity: "success",
    }
  };
  
  const uploadReducer = (state = initialState, action) => {
    switch (action.type) {
      case UPLOAD_FILE_INIT:
        return { ...state, isLoading: true, message: "", error: null };
  
      case UPLOAD_FILE_SUCCESS:
        return { ...state, isLoading: false, message: action.payload, file: null };
  
      case UPLOAD_FILE_FAILURE:
        return { ...state, isLoading: false, error: action.payload };
  
      case CANCEL_UPLOAD:
        return { ...state, file: null, isLoading: false, message: "", error: null };
  
      case SHOW_SNACKBAR:
        return { ...state, snackbar: { open: true, message: action.payload.message, severity: action.payload.severity } };
  
      case HIDE_SNACKBAR:
        return { ...state, snackbar: { open: false, message: "", severity: "success" } };
  
      default:
        return state;
    }
  };
  
  export default uploadReducer;
  