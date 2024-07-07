import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

const TaskCard = ({ task, onClick }) => {
  const formattedDate = new Date(task.date).toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
  });
  const formattedDueDate = new Date(task.dueDate).toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
  });
  const cardStyle = {
    marginBottom: "8px",
    marginTop: "8px",
    opacity: task.status === 4 ? 0.7 : 1,
    filter: task.status === 4 ? "blur(1px)" : "none",
    cursor: "pointer",
    transition: "all 0.3s ease",
    "&:hover": {
      boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
    },
  };

  const descriptionStyle = {
    maxHeight: "60px",
    overflow: "hidden",
    textOverflow: "ellipsis",
  };

  return (
    <Card style={cardStyle} onClick={onClick}>
      <CardContent>
        <Typography variant="body1" style={descriptionStyle}>
          {task.description}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Created: {formattedDate}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Due: {formattedDueDate}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default TaskCard;
