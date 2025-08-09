import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import { AuthProvider, AuthContext } from "./contexts/AuthContext";
import ProfileView from "./components/ProfileView";
import ProfileEdit  from "./components/ProfileEdit";


import FriendRequests from "./components/FriendRequests";
import FriendList from "./components/FriendList";

function PrivateRoute({ children }) {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={<PrivateRoute><Dashboard /></PrivateRoute>}
          />
          <Route path="*" element={<Navigate to="/login" />} />
          <Route path="/friend-requests" element={<PrivateRoute><FriendRequests /></PrivateRoute>} />
          <Route path="/friends" element={<PrivateRoute><FriendList /></PrivateRoute>} />
          <Route path="/profile/:id" element={<PrivateRoute><ProfileView /></PrivateRoute>} />
          <Route path="/edit-profile" element={<PrivateRoute><ProfileEdit /></PrivateRoute>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
export default App;
