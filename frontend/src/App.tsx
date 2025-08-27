import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { PrivateRoute } from "./routes";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

const HomePage = () => <h1>Home</h1>;
const GiftsPage = () => <h1>Your Gifts</h1>;
const GiftPage = () => <h1>Gift</h1>;
const ProfilePage = () => <h1>Your Profile</h1>;

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          <Route path="/" element={<PrivateRoute><HomePage /></PrivateRoute>} />
          <Route path="/gifts" element={<PrivateRoute><GiftsPage /></PrivateRoute>} />
          <Route path="/gift/:id" element={<PrivateRoute><GiftPage /></PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;