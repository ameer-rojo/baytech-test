import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { statuses } from "./const";

const EditTaskModal = ({
  open,
  handleClose,
  onSave,
  onDelete,
  selectedTask,
  selectedStatus,
  setSelectedStatus,
}) => {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    if (selectedTask) {
      setDescription(selectedTask.description);
      setDate(selectedTask.date);
      setDueDate(selectedTask.dueDate);
      setSelectedStatus({
        id: selectedTask.status,
        name: statuses.find((status) => status.id === selectedTask.status).name,
      });
    } else {
      setDescription("");
      setDate("");
      setDueDate("");
      setSelectedStatus({ id: "", name: "" });
    }
  }, [selectedTask, setSelectedStatus]);

  const handleSave = () => {
    onSave({
      ...selectedTask,
      description,
      date,
      dueDate,
      status: selectedStatus.id,
    });
    handleClose();
  };

  const handleDelete = () => {
    onDelete(selectedTask.id);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Edit Task</DialogTitle>
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
          label="Date"
          fullWidth
          value={date}
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
        <Button onClick={handleDelete} color="secondary">
          Delete
        </Button>
        <Button onClick={handleSave} color="primary">
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditTaskModal;
