import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Divider,
  IconButton,
} from "@mui/material";
import axios from "axios";
import ChatIcon from "@mui/icons-material/Chat";
import CloseIcon from "@mui/icons-material/Close";

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newUserMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, newUserMessage]);

    try {
      const res = await axios({
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.REACT_APP_GEMINI_API_KEY}`,
        method: "post",
        data: { contents: [{ parts: [{ text: input }] }] },
      });

      const reply = res.data.candidates[0].content.parts[0].text;
      const newBotMessage = { sender: "bot", text: reply };
      setMessages((prev) => [...prev, newBotMessage]);

    } catch (err) {
      const errorMessage = err.response?.data?.message || "AI server is low";
      setMessages((prev) => [...prev, { sender: "bot", text: errorMessage }]);
    }

    setInput("");
  };

  return (
    <>
      {!isOpen && (
        <IconButton
          onClick={() => setIsOpen(true)}
          sx={{
            position: "fixed",
            bottom: 20,
            right: 20,
            bgcolor: "primary.main",
            color: "white",
            "&:hover": { bgcolor: "primary.dark" },
          }}
        >
          <ChatIcon />
        </IconButton>
      )}

      {isOpen && (
        <Paper
          elevation={6}
          sx={{
            position: "fixed",
            bottom: 20,
            right: 20,
            width: 300,
            maxHeight: 400,
            overflowY: "auto",
            padding: 2,
          }}
        >
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6" color="primary">
              AI Chatbot
            </Typography>
            <IconButton onClick={() => setIsOpen(false)} size="small">
              <CloseIcon />
            </IconButton>
          </Box>
          <Divider sx={{ mb: 1 }} />
          {messages.map((msg, i) => (
            <Typography
              key={i}
              sx={{
                textAlign: msg.sender === "user" ? "right" : "left",
                backgroundColor: msg.sender === "user" ? "#e1bee7" : "#ede7f6",
                borderRadius: 1,
                padding: "4px 8px",
                marginBottom: 1,
              }}
            >
              {msg.text}
            </Typography>
          ))}
          <Box display="flex" gap={1}>
            <TextField
              variant="outlined"
              size="small"
              fullWidth
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") sendMessage();
              }}
            />
            <Button variant="contained" onClick={sendMessage}>
              Send
            </Button>
          </Box>
        </Paper>
      )}
    </>
  );
}

export default Chatbot;
