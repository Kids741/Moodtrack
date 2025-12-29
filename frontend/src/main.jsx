import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext"; 

import App from "./App.jsx";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import MoodTrackerPage from "./pages/MoodTrackerPage.jsx";
import JournalPage from "./pages/JournalPage.jsx";
import ChatbotPage from "./pages/ChatbotPage.jsx";
import SettingsPage from "./pages/SettingsPage.jsx";
import LogMoodPage from "./pages/LogMoodPage.jsx";
import Therapists from "./pages/Therapists.jsx";
import About from "./pages/AboutPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import ForgotPasswordPage from "./pages/ForgotPasswordPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import FlowerPage from "./pages/Flower.jsx";
import FAQPage from "./pages/FAQPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import { ErrorPage } from "./components/ErrorBoundary.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";


import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/signup", element: <SignupPage /> },
      { path: "/forgot-password", element: <ForgotPasswordPage /> },
      { path: "/logmood", element: <ProtectedRoute><LogMoodPage /></ProtectedRoute> },
      { path: "/mood-tracker", element: <ProtectedRoute><MoodTrackerPage /></ProtectedRoute> },
      { path: "/journal", element: <ProtectedRoute><JournalPage /></ProtectedRoute> },
      { path: "/chatbot", element: <ProtectedRoute><ChatbotPage /></ProtectedRoute> },
      { path: "/about", element: <About /> },
      { path: "/settings", element: <ProtectedRoute><SettingsPage /></ProtectedRoute> },
      { path: "/therapists", element: <Therapists /> },
      { path: "/flower", element: <ProtectedRoute><FlowerPage /></ProtectedRoute> },
      { path: "/contact", element: <ContactPage /> },
      { path: "/faq", element: <FAQPage /> },
      { path: "/dashboard", element: <ProtectedRoute><Dashboard /></ProtectedRoute> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* Wrap  app in AuthProvider */}
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
