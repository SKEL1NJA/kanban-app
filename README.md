KarmKaro – Realtime Kanban Board

KarmKaro is a full-stack Kanban task management application that helps teams organize work, track progress, and collaborate in real time.

Inspired by the idea of “Karm karo, progress dekho”, the application allows users to manage tasks using boards, lists, and cards with drag-and-drop functionality and live updates.

It supports secure authentication, collaborative task management, and real-time synchronization of task movements using WebSockets.

🌐 Live Demo

Frontend (Vercel)
https://kanban-app-two-nu.vercel.app

Backend API (Render)
https://kanban-api-6djm.onrender.com

📸 Application Workflow

```bash
User Authentication
      ↓
Create Workspace
      ↓
Create Boards
      ↓
Create Lists (Kanban Columns)
      ↓
Create Cards (Tasks)
      ↓
Drag & Drop Cards Across Lists
      ↓
Realtime Updates via WebSockets
```

✨ Features
🔐 Authentication

- User registration and login

- Secure authentication using JWT

- Protected routes using React Context API

📂 Workspace Management

- Create multiple workspaces

- Organize projects inside workspaces

📋 Boards & Lists

- Each workspace can contain multiple boards

- Boards contain multiple lists (columns)

Example lists:

```bash
Todo
In Progress
Done
```

📝 Task Cards

- Create and manage task cards

- Move cards across lists

- Reorder tasks within a list

🔄 Drag & Drop

- Implemented using @hello-pangea/dnd

- Smooth drag-and-drop task management

⚡ Realtime Collaboration

- Card movements update instantly across users

- Powered by Socket.io

🚀 Deployment

- Frontend deployed on Vercel

- Backend deployed on Render

- Database hosted on MongoDB Atlas

🛠 Tech Stack
Frontend

- React (Vite)

- React Router

- Axios

- Tailwind CSS

- React Hot Toast

- @hello-pangea/dnd

Backend

- Node.js

- Express.js

- MongoDB

- Mongoose

- JWT Authentication

- Socket.io

Infrastructure

- Vercel – Frontend hosting

- Render – Backend hosting

- MongoDB Atlas – Cloud database

🏗 System Architecture

```bash
Client (React + Vite)
        │
        │ HTTP Requests (Axios)
        ▼
Backend API (Node + Express)
        │
        │ Database Queries
        ▼
MongoDB Atlas

Realtime Layer
Client ⇄ Socket.io ⇄ Server
```

📁 Project Structure

```bash
KARMKARO
│
├── client
│   ├── src
│   │   ├── api
│   │   ├── components
│   │   ├── context
│   │   ├── pages
│   │   ├── socket
│   │   └── main.jsx
│   │
│   ├── .env
│   ├── package.json
│   └── vite.config.js
│
├── server
│   ├── src
│   │   ├── controllers
│   │   ├── models
│   │   ├── routes
│   │   └── middleware
│   │
│   ├── server.js
│   └── package.json
```

⚙️ Environment Variables
Frontend (.env)

``` bash
VITE_API_URL=https://kanban-api-6djm.onrender.com
```

Backend (.env)

```bash
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CLIENT_URL=https://kanban-app-two-nu.vercel.app
```

🚀 Local Development Setup

Clone the repository

```bash
git clone https://github.com/SKEL1NJA/KarmKaro.git
```

Navigate to the project folder

```bash
cd KarmKaro
```
Install Backend Dependencies

```bash
cd server
npm install
npm run dev
```

Install Frontend Dependencies

```bash
cd client
npm install
npm run dev
```

📜 License

This project is licensed under the MIT License.

👨‍💻 Author

Uday Khanna

GitHub
https://github.com/SKEL1NJA

LinkedIn
https://www.linkedin.com/