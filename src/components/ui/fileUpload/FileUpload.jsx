import React, { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import CloseIcon from "@mui/icons-material/Close";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { uploadFile, cancelUpload, hideSnackbar } from "../../../redux/actions/UploadActions";
import { Select } from "@mui/material";
import "./FileUpload.scss";

const FileUpload = ({ title, siteName, uploadType }) => {
  const dispatch = useDispatch();
  const { isLoading, snackbar } = useSelector((state) => state?.upload);
  const instanceOptions = ["production" , "staging" , "development" , "sandbox"];

  const [selectedInstance, setSelectedInstance] = useState("");
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleUpload = () => {
    if (!file) return;
    dispatch(uploadFile(file, siteName, uploadType, selectedInstance));
  };

  const handleCancelFile = () => {
    dispatch(cancelUpload());
    setFile(null);
  };

  const handleCloseSnackbar = () => {
    dispatch(hideSnackbar());
  };

  const handleDrop = useCallback((event) => {
    event.preventDefault();
    const droppedFiles = event.dataTransfer.files;
    if (droppedFiles.length > 0) {
      handleFileChange({ target: { files: droppedFiles } });
    }
  }, []);

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <div className="file-upload-section" onDrop={handleDrop} onDragOver={handleDragOver}>
      <h2>{title}</h2>

      <TextField
        variant="outlined"
        label="Site Name"
        value={siteName}
        fullWidth
        className="form-control"
        InputProps={{ readOnly: true }}
        InputLabelProps={{ shrink: true }}
      />

      {uploadType === "job" && (
        <FormControl variant="outlined" className="form-control">
          <Select
            value={selectedInstance}
            onChange={(e) => setSelectedInstance(e.target.value)}
            displayEmpty
          >
            <MenuItem value="" disabled>
              Select Instance
            </MenuItem>
            {instanceOptions.map((instance, index) => (
              <MenuItem key={instance + index} value={instance}>
                {instance}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}

      <div className="file-upload">
        <div className="drag-drop-box">
          <CloudUploadIcon className="cloud-icon" />
          <span className="drag-drop-text">Drag & drop your file here</span>
          <input
            type="file"
            id={`file-upload-${uploadType}`}
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          <Button
            variant="outlined"
            component="span"
            onClick={() => document.getElementById(`file-upload-${uploadType}`).click()}
          >
            Browse
          </Button>
          {file && (
            <div className="file-info">
              <h3>{file.name}</h3>
              <IconButton size="small" onClick={handleCancelFile}>
                <CloseIcon />
              </IconButton>
            </div>
          )}
        </div>
      </div>

      {file && (
        <Button
          variant="contained"
          color="primary"
          onClick={handleUpload}
          disabled={isLoading}
        >
          {isLoading ? "Uploading..." : "Upload File"}
        </Button>
      )}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default FileUpload;
