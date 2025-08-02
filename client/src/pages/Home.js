import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Chatbot from "./Chatbot";
import {
  Box,
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  CardActions,
  Grid,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { purple } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: { main: purple[600] },
    secondary: { main: purple[300] },
  },
});

function Home() {
  const navigate = useNavigate();
  const [todoTask, setTodoTask] = useState([]);
  const [task, setTask] = useState("");
  const [inprogressTask, setinprogressTask] = useState([]);
  const [completedTask, setcompletedTask] = useState([]);
  const [editMode, seteditMode] = useState(false);
  const [editId, seteditId] = useState();

  const fetchall = () => {
    fetchTask("To-do");
    fetchTask("In progress");
    fetchTask("Completed");
  };

  useEffect(() => {
    fetchall();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`${process.env.REACT_APP_URL}/api/update-status/${id}`, { status });
      fetchall();
    } catch (err) {
      console.log(err.response?.data?.message || "Status couldn't be updated");
    }
  };

  const fetchTask = async (status) => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_URL}/api/task`, {
        params: { status },
      });
      if (status === "To-do") setTodoTask(res.data);
      else if (status === "In progress") setinprogressTask(res.data);
      else setcompletedTask(res.data);
    } catch (err) {
      console.log(err.response?.data?.message || "Error fetching task");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_URL}/api/delete/${id}`);
      fetchall();
    } catch (err) {
      console.log(err.response?.data?.message || "Error deleting task");
    }
  };

  const addTask = async () => {
    if (editMode) {
      try {
        await axios.put(`${process.env.REACT_APP_URL}/api/edit-task/${editId}`, { task });
        fetchall();
        setTask("");
        seteditMode(false);
        seteditId(undefined);
      } catch (err) {
        console.log(err.response?.data?.message || "Task couldn't be updated");
      }
    } else {
      try {
        await axios.post(`${process.env.REACT_APP_URL}/api/add-task/`, { task });
        fetchall();
        setTask("");
      } catch (err) {
        console.log(err.response?.data?.message || "Task couldn't be added");
      }
    }
  };

  const handleEdit = (taskItem) => {
    seteditMode(true);
    setTask(taskItem.task);
    seteditId(taskItem._id);
  };

  return React.createElement(
    ThemeProvider,
    { theme },
    React.createElement(
      Box,
      {
        sx: {
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f5f5f5",
          padding: 2,
        },
      },
      React.createElement(
        Box,
        {
          sx: {
            width: "100%",
            maxWidth: "1000px",
            padding: 4,
            borderRadius: 2,
            boxShadow: 4,
            backgroundColor: "white",
            fontFamily: "Arial",
          },
        },
        React.createElement(Typography, { variant: "h4", color: "primary", gutterBottom: true }, "Task Manager"),
        React.createElement(
          Box,
          { sx: { marginBottom: 4, display: "flex", gap: 2, flexWrap: "wrap" } },
          React.createElement(TextField, {
            label: "Enter task...",
            variant: "outlined",
            value: task,
            onChange: (e) => setTask(e.target.value),
            sx: { width: "250px" },
          }),
          React.createElement(
            Button,
            { variant: "contained", color: "primary", onClick: addTask },
            editMode ? "Update Task" : "Add Task"
          )
        ),
        React.createElement(
          Grid,
          { container: true, spacing: 3 },
          renderTaskColumn("To-Do", todoTask, (item) =>
            React.createElement(React.Fragment, null,
              React.createElement(Button, {
                onClick: () => updateStatus(item._id, "In progress"),
                color: "secondary",
                variant: "outlined",
                sx: { marginRight: 1 }
              }, "Move to In Progress"),
              React.createElement(Button, {
                onClick: () => handleEdit(item),
                color: "primary",
                variant: "outlined",
                sx: { marginRight: 1 }
              }, "Edit"),
              React.createElement(Button, {
                onClick: () => handleDelete(item._id),
                color: "error",
                variant: "outlined"
              }, "Delete")
            )
          ),
          renderTaskColumn("In Progress", inprogressTask, (item) =>
            React.createElement(Button, {
              onClick: () => updateStatus(item._id, "Completed"),
              color: "secondary",
              variant: "contained"
            }, "Mark Completed")
          ),
          renderTaskColumn("Completed", completedTask, (item) =>
            React.createElement(Button, {
              onClick: () => handleDelete(item._id),
              color: "error",
              variant: "contained"
            }, "Delete")
          )
        )
      )
    )
  );

  function renderTaskColumn(title, tasks, actionButtons) {
    return React.createElement(
      Grid,
      { item: true, xs: 12, sm: 6, md: 4 },
      React.createElement(Typography, { variant: "h6", color: "primary", gutterBottom: true }, title),
      tasks.map((item) =>
        React.createElement(
          Card,
          {
            key: item._id,
            sx: {
              marginBottom: 2,
              backgroundColor: title === "Completed" ? "#f3e5f5" : "white",
              boxShadow: 3,
            },
          },
          React.createElement(
            CardContent,
            null,
            React.createElement(Typography, null, item.task)
          ),
          React.createElement(
            CardActions,
            null,
            actionButtons(item)
          ),
          React.createElement(Chatbot)
          
        )
        
      )
      
    );
  }
}

export default Home;
