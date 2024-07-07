import React, { useState, useEffect } from "react";
import { Grid, Button, Typography } from "@mui/material";
import { statuses } from "./const.jsx";
import AddTaskModal from "./AddTaskModal";
import EditTaskModal from "./EditTaskModal";
import TaskCard from "./TaskCard";
import { DragDropContext, Draggable } from "react-beautiful-dnd";
import { StrictModeDroppable } from "./StrictModeDroppable.jsx";
import AddIcon from "@mui/icons-material/Add";

const TaskBoard = () => {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState({ id: "", name: "" });
  const [selectedTask, setSelectedTask] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(savedTasks);
  }, []);

  const currentDate = new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  });

  const handleAddTask = (id, name) => {
    setSelectedStatus({ id, name });
    setOpenAddModal(true);
  };

  const handleEditTask = (task) => {
    setSelectedTask(task);
    setOpenEditModal(true);
  };

  const handleCloseAddModal = () => {
    setOpenAddModal(false);
    setDescription("");
    setDueDate("");
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
    setSelectedTask(null);
  };

  const addTask = () => {
    const newTask = {
      id: tasks.length ? tasks[tasks.length - 1].id + 1 : 1,
      status: selectedStatus.id,
      description,
      date: currentDate,
      dueDate,
    };
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    handleCloseAddModal();
  };

  const saveEditedTask = (updatedTask) => {
    const updatedTasks = tasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    handleCloseEditModal();
  };

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    handleCloseEditModal();
  };

  const onColumnClick = (id, name) => {
    setSelectedStatus({ id, name });
  };

  const handleDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) {
      return;
    }

    const reorderedTasks = [...tasks];
    const [removed] = reorderedTasks.splice(source.index, 1);
    reorderedTasks.splice(destination.index, 0, removed);

    const newStatusId = parseInt(
      destination.droppableId.replace("droppable-", "")
    );
    const taskId = parseInt(result.draggableId.replace("task-", ""));

    const updatedTasks = reorderedTasks.map((task) =>
      task.id === taskId ? { ...task, status: newStatusId } : task
    );

    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Grid container spacing={3}>
        {statuses.map((status) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={3}
            key={status.id}
            onClick={() => onColumnClick(status.id, status.name)}
          >
            <div style={{ padding: "16px", marginBottom: "16px" }}>
              <Typography variant="h6" gutterBottom>
                {status.name}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleAddTask(status.id, status.name)}
                sx={{
                  backgroundColor: "white",
                  color: "blue",
                  width: "100%",
                  height: "30px",
                  minHeight: "30px",
                  "& .MuiButton-startIcon": {
                    color: "blue",
                  },
                  "&:hover": {
                    backgroundColor: "#f0f0f0",
                  },
                }}
                startIcon={<AddIcon />}
              ></Button>
              <StrictModeDroppable droppableId={`droppable-${status.id}`}>
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    {tasks
                      .filter((task) => task.status === status.id)
                      .map((task, index) => (
                        <Draggable
                          key={task.id}
                          draggableId={`task-${task.id}`}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <TaskCard
                                task={task}
                                onClick={() => handleEditTask(task)}
                              />
                            </div>
                          )}
                        </Draggable>
                      ))}
                    {provided.placeholder}
                  </div>
                )}
              </StrictModeDroppable>
            </div>
          </Grid>
        ))}
      </Grid>

      <AddTaskModal
        open={openAddModal}
        handleClose={handleCloseAddModal}
        addTask={addTask}
        selectedStatus={selectedStatus}
        currentDate={currentDate}
        description={description}
        setDescription={setDescription}
        dueDate={dueDate}
        setDueDate={setDueDate}
        setSelectedStatus={setSelectedStatus}
      />

      <EditTaskModal
        open={openEditModal}
        handleClose={handleCloseEditModal}
        onSave={saveEditedTask}
        onDelete={deleteTask}
        selectedTask={selectedTask}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
      />
    </DragDropContext>
  );
};

export default TaskBoard;
