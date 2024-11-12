// src/redux/actions.js
import { 
  UPLOAD_FILE_INIT, 
  UPLOAD_FILE_SUCCESS, 
  UPLOAD_FILE_FAILURE, 
  CANCEL_UPLOAD, 
  SHOW_SNACKBAR, 
  HIDE_SNACKBAR 
} from '../types/UploadTypes';
import { uploadService } from '../services/UploadService';

export const uploadFile = (file, siteName, uploadType, selectedInstance) => async (dispatch) => {
  dispatch({ type: UPLOAD_FILE_INIT });

  try {
    const response = await uploadService(file, siteName, uploadType, selectedInstance);
    dispatch({
      type: UPLOAD_FILE_SUCCESS,
      payload: response?.data?.status || "File uploaded successfully!",
    });
    dispatch(showSnackbar("File uploaded successfully!", "success"));
  } catch (error) {
    dispatch({
      type: UPLOAD_FILE_FAILURE,
      payload: error.response?.data?.message || "Error uploading file",
    });
    dispatch(showSnackbar(error.response?.data?.message || "Error uploading file", "error"));
  }
};

export const cancelUpload = () => (dispatch) => {
  dispatch({ type: CANCEL_UPLOAD });
  dispatch(showSnackbar("Upload canceled.", "info"));
};

export const showSnackbar = (message, severity) => ({
  type: SHOW_SNACKBAR,
  payload: { message, severity }
});

export const hideSnackbar = () => ({
  type: HIDE_SNACKBAR
});
