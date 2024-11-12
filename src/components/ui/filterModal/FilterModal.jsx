
import React, { useState } from "react";
import {
  Modal,
  Box,
  TextField,
  Button,
  IconButton,
  FormControl,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import "./FilterModal.scss";
// import { formatDate } from "../../../helpers/FormatDate";

const FilterModal = ({
  open,
  handleClose,
  handleSubmit,
  filterTitle,
  instanceOptions,
  type
}) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [instance, setInstance] = useState(instanceOptions?.[0]);


  const onSubmit = () => {
    handleSubmit({ startDate, endDate, instance,filterTitle,type });
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box className="filter-modal-box">
        <div className="header-container">
          <Typography variant="h6" className="typography-title">
            {filterTitle}
          </Typography>
          <IconButton className="close-button" onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </div>
        
        {/* <FormControl fullWidth className="modal-field">
          {instanceOptions && (
            <>
              <InputLabel id="instance-select-label">Instance</InputLabel>
              <Select
                labelId="instance-select-label"
                value={instance}
                onChange={(e) => setInstance(e.target.value)}
                label="Select Instance"
              >
                {instanceOptions?.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </>
          )}
        </FormControl> */}
        
        <div className="date-fields-container">
          <TextField
            label="Start Date"
            type="datetime-local"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            fullWidth
            className="modal-field"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            label="End Date"
            type="datetime-local"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            fullWidth
            className="modal-field"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
        
        <Button
          variant="contained"
          color="primary"
          onClick={onSubmit}
          className="submit-button"
          disabled={!startDate || !endDate}
        >
          Submit
        </Button>
      </Box>
    </Modal>
  );
};

export default FilterModal;
