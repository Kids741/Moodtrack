# MoodTrack

[![Frontend Live](https://img.shields.io/badge/Frontend-Live-brightgreen)](https://www.mood-track.app)  
[![Backend Live](https://img.shields.io/badge/Backend-Live-blue)](https://moodtrack-q0hy.onrender.com)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

MoodTrack is a **mental health web app** that helps users track moods, journal thoughts, access mental health resources, and engage with a supportive community. Built with privacy and user well-being as core priorities.

---

## 📑 Table of Contents

- [Live Demo](#-live-demo)
- [Overview](#-overview)
- [Why MoodTrack?](#-why-moodtrack)
- [Technology Stack](#-technology-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Features](#-features)
- [API Documentation](#-api-documentation)
- [Available Scripts](#-available-scripts)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)
- [Team & Contributors](#-team--contributors)
- [Deployment Links](#-deployment-links)
- [Roadmap](#-roadmap)
- [Support](#-support)
- [License](#-license)

---

## 🌐 Live Demo

- **Frontend**: [https://www.mood-track.app](https://www.mood-track.app)  
- **Backend API**: [https://moodtrack-q0hy.onrender.com](https://moodtrack-q0hy.onrender.com)

> 📸 **Screenshots coming soon!** We're working on adding visual previews of the app interface.

---

## 📖 Overview

MoodTrack is a **full-stack MERN application** (MongoDB, Express, React + Vite, Node.js) designed to support mental health and emotional well-being.

**Key Features:**
- 📝 **Daily Mood Tracking** - Log and visualize your emotional patterns over time
- 📖 **Private Journaling** - Express yourself in a safe, encrypted environment
- 🤖 **AI-Powered Insights** - Get personalized mental health suggestions and resources
- 💬 **Community Support** - Connect with others in a safe, moderated space
- 📊 **Analytics & Trends** - Understand your mood patterns with visual charts and history

---

## 💡 Why MoodTrack?

Mental health awareness is crucial, yet many people lack accessible tools to monitor their emotional well-being. MoodTrack provides:

- ✅ **Privacy-First Design** - Your data is encrypted and secure
- ✅ **Evidence-Based Approach** - Features based on mental health research
- ✅ **User-Friendly Interface** - Simple, intuitive design for all ages
- ✅ **Free & Accessible** - No paywalls for essential mental health tools
- ✅ **Community Support** - Connect with others on similar journeys

---

## 🧰 Technology Stack

| Layer            | Technology                                     |
|------------------|------------------------------------------------|
| Frontend         | React.js, Vite, Tailwind CSS, Shadcn/ui       |
| Backend          | Node.js, Express.js                            |
| Database         | MongoDB (via Mongoose ODM)                     |
| Authentication   | JWT, bcrypt                                    |
| API Integration  | Axios, RESTful API                             |
| Hosting          | Frontend: Vercel • Backend: Render             |
| Version Control  | Git & GitHub                                   |

---

## 🗂 Project Structure

```
MoodTrack/
├── backend/                    # Node.js + Express API
│   ├── config/                 # Database configuration
│   ├── controllers/            # Route controllers
│   ├── middleware/             # Auth & validation middleware
│   ├── models/                 # MongoDB schemas (User, Mood, Journal, etc.)
│   ├── routes/                 # API routes
│   ├── utils/                  # Helper functions
│   ├── server.js               # Entry point
│   └── package.json
│
├── frontend/                   # React + Vite application
│   ├── src/
│   │   ├── assets/             # Images, icons
│   │   ├── components/         # Reusable UI components
│   │   ├── context/            # React Context (Auth, etc.)
│   │   ├── pages/              # Page components
│   │   ├── utils/              # Helper functions
│   │   ├── App.jsx             # Main app component
│   │   └── main.jsx            # Entry point
│   ├── public/
│   └── package.json
│
├── .gitignore
├── vercel.json                 # Vercel deployment config
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **pnpm** (v8 or higher) - Install with `npm install -g pnpm`
- **MongoDB** (local or Atlas account) - [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- **Git** - [Download](https://git-scm.com/)

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Kids741/MoodTrack.git
cd MoodTrack
```

### 2️⃣ Setup the Backend

```bash
cd backend
pnpm install
```

Create a `.env` file in the `backend` directory (see [Environment Variables](#-environment-variables))

```bash
pnpm run dev
```

➡️ **API runs at:** `http://localhost:5000`

### 3️⃣ Setup the Frontend

```bash
cd frontend
pnpm install
```

Create a `.env` file in the `frontend` directory (see [Environment Variables](#-environment-variables))

```bash
pnpm run dev
```

➡️ **App runs at:** `http://localhost:5173`

---

## 🔐 Environment Variables

### Backend `.env`

Create a `.env` file in the `backend` directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/moodtrack?retryWrites=true&w=majority

# Authentication
JWT_SECRET=your_super_secure_jwt_secret_key_here_min_32_chars

# API Keys (if applicable)
OPENAI_API_KEY=your_openai_api_key_for_chatbot
```

### Frontend `.env`

Create a `.env` file in the `frontend` directory:

```env
# API Configuration
VITE_API_URL=http://localhost:5000/api
```

**For Production:**
```env
VITE_API_URL=https://moodtrack-q0hy.onrender.com/api
```

> ⚠️ **Security Note:** Never commit `.env` files to version control. They are already included in `.gitignore`.

---

## ✨ Features

### 📝 Daily Mood Tracking
Track your emotional state throughout the day with our intuitive mood selector. Visualize patterns and trends over time.

### 📖 Personal Journaling
Express your thoughts in a private, secure journal. All entries are encrypted and only accessible to you.

### 💬 Community Support Forum
Connect with others in a safe, moderated environment. Share experiences and support each other's mental health journeys.

### 🤖 AI-Powered Mental Health Suggestions
Receive personalized recommendations, coping strategies, and resources based on your mood patterns.

### 📊 Mood Analytics and History
View comprehensive charts and statistics about your emotional well-being over days, weeks, and months.

### 🔒 Secure Authentication
Industry-standard JWT authentication with encrypted passwords ensures your data stays private.

---

## 📡 API Documentation

### Authentication Endpoints

| Method | Endpoint          | Description                    | Auth Required |
|--------|-------------------|--------------------------------|---------------|
| POST   | `/api/auth/register` | Register a new user         | No            |
| POST   | `/api/auth/login`    | Login user                  | No            |
| POST   | `/api/auth/logout`   | Logout user                 | Yes           |
| GET    | `/api/auth/me`       | Get current user info       | Yes           |

### Mood Endpoints

| Method | Endpoint              | Description                    | Auth Required |
|--------|-----------------------|--------------------------------|---------------|
| GET    | `/api/moods`          | Get all user moods            | Yes           |
| POST   | `/api/moods`          | Log a new mood entry          | Yes           |
| GET    | `/api/moods/:id`      | Get specific mood entry       | Yes           |
| PUT    | `/api/moods/:id`      | Update mood entry             | Yes           |
| DELETE | `/api/moods/:id`      | Delete mood entry             | Yes           |

### Journal Endpoints

| Method | Endpoint              | Description                    | Auth Required |
|--------|-----------------------|--------------------------------|---------------|
| GET    | `/api/journal`        | Get all journal entries       | Yes           |
| POST   | `/api/journal`        | Create new journal entry      | Yes           |
| GET    | `/api/journal/:id`    | Get specific journal entry    | Yes           |
| PUT    | `/api/journal/:id`    | Update journal entry          | Yes           |
| DELETE | `/api/journal/:id`    | Delete journal entry          | Yes           |

### Chatbot Endpoints

| Method | Endpoint              | Description                    | Auth Required |
|--------|-----------------------|--------------------------------|---------------|
| POST   | `/api/chatbot/chat`   | Send message to AI chatbot    | Yes           |
| GET    | `/api/chatbot/history`| Get chat history              | Yes           |

> 📖 For detailed request/response examples, see our [API Documentation](docs/API.md) (coming soon).

---

## 🛠 Available Scripts

### Backend Scripts

```bash
pnpm run dev          # Start development server with nodemon
pnpm start            # Start production server
pnpm test             # Run tests (if configured)
```

### Frontend Scripts

```bash
pnpm run dev          # Start Vite development server
pnpm run build        # Build for production
pnpm run preview      # Preview production build
pnpm run lint         # Run ESLint
```

---

## 🔧 Troubleshooting

### Common Issues

#### 1. **Port Already in Use**
```bash
# Error: Port 5000 is already in use
# Solution: Change PORT in backend/.env or kill the process
```

**Windows:**
```powershell
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

**Mac/Linux:**
```bash
lsof -ti:5000 | xargs kill -9
```

#### 2. **MongoDB Connection Failed**
- Verify your `MONGODB_URI` is correct
- Check if your IP is whitelisted in MongoDB Atlas
- Ensure network connectivity

#### 3. **CORS Errors**
- Ensure `withCredentials: true` in axios config
- Verify backend CORS settings allow your frontend origin
- Check that cookies are being sent

#### 4. **Build Fails**
```bash
# Clear cache and reinstall dependencies
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

#### 5. **Environment Variables Not Loading**
- Restart development server after changing `.env`
- Verify variable names (Frontend must start with `VITE_`)
- Check `.env` file is in correct directory

### Getting Help

If you encounter issues not covered here:
1. Check [existing issues](https://github.com/Kids741/MoodTrack/issues)
2. [Open a new issue](https://github.com/Kids741/MoodTrack/issues/new)
3. Contact the team (see [Support](#-support))

---

## 🤝 Contributing

We welcome contributions from developers and mental health enthusiasts! Here's how you can help:

### Ways to Contribute

- 🐛 Report bugs and issues
- 💡 Suggest new features or improvements
- 📝 Improve documentation
- 🧪 Write tests
- 🎨 Enhance UI/UX
- 🌐 Add translations

### Steps to Contribute

1. **Fork the repository**

2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/MoodTrack.git
   cd MoodTrack
   ```

3. **Create a new branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

4. **Make your changes**
   - Write clean, documented code
   - Follow existing code style
   - Add tests if applicable

5. **Commit your changes**
   ```bash
   git add .
   git commit -m "Add: Amazing new feature"
   ```

6. **Push to your fork**
   ```bash
   git push origin feature/amazing-feature
   ```

7. **Open a Pull Request**
   - Go to the original repository
   - Click "New Pull Request"
   - Select your branch
   - Describe your changes

### Branch Naming Convention

| Prefix       | Purpose                              | Example                  |
|--------------|--------------------------------------|--------------------------|
| `feature/`   | New features                        | `feature/mood-calendar`  |
| `fix/`       | Bug fixes                           | `fix/auth-redirect`      |
| `docs/`      | Documentation updates               | `docs/api-endpoints`     |
| `refactor/`  | Code refactoring                    | `refactor/auth-logic`    |
| `test/`      | Adding tests                        | `test/mood-controller`   |

### Code of Conduct

Please be respectful and constructive. This is a mental health project - let's maintain a supportive environment.

---

## 👩‍💻 Team & Contributors

### Project Lead & Developer

| Name           | Role                     | GitHub                                |
|----------------|--------------------------|---------------------------------------|
| Dennis Kidake  | Full-Stack Developer     | [@Kids741](https://github.com/Kids741) |

### Contributors

We appreciate all contributions! See [all contributors](https://github.com/Kids741/MoodTrack/graphs/contributors).

---

## 🌐 Deployment Links

| Service              | URL                                                         | Status    |
|----------------------|-------------------------------------------------------------|-----------|
| Frontend (Vercel)    | [https://www.mood-track.app](https://www.mood-track.app)   | ✅ Live   |
| Backend (Render)     | [https://moodtrack-q0hy.onrender.com](https://moodtrack-q0hy.onrender.com) | ✅ Live |
| Database (MongoDB)   | MongoDB Atlas                                               | 🔒 Private |

### Deployment Notes

- **Frontend**: Auto-deploys from `main` branch via Vercel
- **Backend**: Auto-deploys from `main` branch via Render
- **Database**: Hosted on MongoDB Atlas with automated backups

---

## 🗺 Roadmap

### Current Version: v1.0.0

### Upcoming Features

- [ ] **Mobile App** - React Native version for iOS/Android
- [ ] **Mood Reminders** - Push notifications for daily mood logging
- [ ] **Therapist Portal** - Professional access for licensed therapists
- [ ] **Data Export** - Export your mood and journal data
- [ ] **Dark Mode** - Full dark theme support
- [ ] **Multi-language Support** - Translations for global accessibility
- [ ] **Social Features** - Friends, mood sharing (with privacy controls)
- [ ] **Advanced Analytics** - ML-based mood predictions and insights
- [ ] **Integration APIs** - Connect with fitness apps, calendars, etc.

### Completed ✅

- [x] User authentication system
- [x] Mood tracking with visualization
- [x] Private journaling
- [x] AI-powered chatbot
- [x] Responsive design
- [x] Secure API with JWT

---

## 💬 Support

### Need Help?

- 📧 **Email**: support@mood-track.app
- 🐛 **Bug Reports**: [GitHub Issues](https://github.com/Kids741/MoodTrack/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/Kids741/MoodTrack/discussions)
- 📖 **Documentation**: [Wiki](https://github.com/Kids741/MoodTrack/wiki) (coming soon)

### Mental Health Resources

If you're in crisis or need immediate support:

- 🇺🇸 **USA**: National Suicide Prevention Lifeline: 988
- 🇬🇧 **UK**: Samaritans: 116 123
- 🌍 **International**: [Find a Helpline](https://findahelpline.com/)

---

## 📜 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

### What This Means

✅ You can use this code for personal or commercial projects  
✅ You can modify and distribute the code  
✅ You must include the original copyright notice  
❌ The software is provided "as-is" without warranty

---

## 🙏 Acknowledgments

- Mental health professionals who provided guidance on best practices
- The open-source community for amazing tools and libraries
- All users who trust MoodTrack with their mental health journey
- Contributors who help make this project better

---

## ⭐ Show Your Support

If MoodTrack has helped you or you believe in our mission, please:

- ⭐ **Star this repository**
- 🔄 **Share with others** who might benefit
- 🤝 **Contribute** to make it better
- 💬 **Provide feedback** to help us improve

---

**© 2025 MoodTrack** – Built with ❤️ for mental health awareness

*Remember: MoodTrack is a supportive tool, not a replacement for professional mental health care. Always consult qualified professionals for serious mental health concerns.*
