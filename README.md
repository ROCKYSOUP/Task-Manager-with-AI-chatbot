# 🧠 Task Manager with AI Chatbot

A full-stack MERN (MongoDB, Express, React, Node.js) Task Management App with integrated AI chatbot support for enhanced productivity and guidance.

---

## 🌐 Screenshots

<img width="1918" height="1011" alt="Screenshot 2025-08-02 203855" src="https://github.com/user-attachments/assets/6f361d92-ef79-4854-8dd2-50e7c74862c5" />

## 📁 Project Structure

```
/client   → React frontend
/server   → Node.js + Express backend with OpenAI integration
.gitignore → excludes environment and config files
```

---

## 🚀 Features

- Create, edit, and delete tasks
- Task status: To-do, In Progress, Completed
- Chatbot integration (Google GEMINI API)
- Clean and intuitive UI
- Separate environment handling for client and server

---

## 🛠️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/ROCKYSOUP/Task-Manager-with-AI-chatbot.git
cd Task-Manager-with-AI-chatbot
```

---

### 2. Setup Server (Backend)

```bash
cd server
npm install
```

#### Create a `.env` file in `/server`:

```env
PORT=5000
MONGO_URI=your_mongo_uri

```

#### Run the server:

```bash
npm start
```

---

### 3. Setup Client (Frontend)

```bash
cd ../client
npm install
```

#### Create a `.env` file in `/client`:

```env
REACT_APP_URL=http://localhost:5000
REACT_APP_GEMINI_API_KEY=your_openai_key
```

#### Run the client:

```bash
npm start
```

---

## 🧠 AI Integration

- Uses GEMINI GPT API
- Sends user queries to route and returns AI responses

---

## ⚙️ Scripts

**Client**

- `npm start` – Start React app

**Server**

- `npm start` – Start Node server


---

## 🌐 Deployment

You can deploy the frontend and backend separately on platforms like:

- Frontend: Vercel / Netlify
- Backend: Render / Railway / Cyclic

---

## 📝 License

This project is licensed under the [MIT License](LICENSE).

---

## 👨‍💻 Author

Made with ❤️ by [ROCKYSOUP](https://github.com/ROCKYSOUP)
