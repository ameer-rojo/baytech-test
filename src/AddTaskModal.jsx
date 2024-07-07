import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Select,
  InputLabel,
  MenuItem,
  FormControl,
} from "@mui/material";
import { statuses } from "./const";
const AddTaskModal = ({
  open,
  handleClose,
  addTask,
  selectedStatus,
  currentDate,
  description,
  setDescription,
  dueDate,
  setDueDate,
  setSelectedStatus,
}) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add Task to {selectedStatus.name}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Description"
          fullWidth
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Date created"
          fullWidth
          value={currentDate}
          disabled
        />
        <TextField
          margin="dense"
          label="Due Date"
          fullWidth
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            min: new Date().toISOString().split("T")[0],
          }}
        />
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Status</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedStatus.id}
            label="Status"
            onChange={(event) =>
              setSelectedStatus({
                id: event.target.value,
                name: statuses.find(
                  (status) => status.id === event.target.value
                ).name,
              })
            }
          >
            {statuses.map((status) => (
              <MenuItem key={status.id} value={status.id}>
                {status.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={addTask} color="primary">
          Add Task
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddTaskModal;
