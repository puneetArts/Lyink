// import React, { useContext } from 'react';
// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import Signup from "./components/Signup";
// import Login from "./components/Login";
// import Dashboard from "./components/Dashboard";
// import { AuthProvider, AuthContext } from "./contexts/AuthContext";
// import ProfileView from "./components/ProfileView";
// import ProfileEdit from "./components/ProfileEdit";
// import FriendRequests from "./components/FriendRequests";
// import FriendList from "./components/FriendList";
// import Header from './components/Header';

// function PrivateRoute({ children }) {
//   const { user, initializing } = useContext(AuthContext);

//   // Wait while AuthContext is still restoring session
//   if (initializing) {
//     return <p>Loading...</p>; // You can replace with a spinner/loader component
//   }

//   // Only allow access if a valid user exists
//   return user ? children : <Navigate to="/login" />;
// }

// function App() {
//   return (
//     <AuthProvider>
//       <BrowserRouter>

//         {/* Put Header here if you want it on all protected pages
//         <Header /> */}

//         <Routes>
//           {/* Public routes */}
//           <Route path="/signup" element={<Signup />} />
//           <Route path="/login" element={<Login />} />

//           {/* Protected routes */}
//           <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
//           <Route path="/friend-requests" element={<PrivateRoute><FriendRequests /></PrivateRoute>} />
//           <Route path="/friends" element={<PrivateRoute><FriendList /></PrivateRoute>} />
//           <Route path="/profile/:id" element={<PrivateRoute><ProfileView /></PrivateRoute>} />
//           <Route path="/edit-profile" element={<PrivateRoute><ProfileEdit /></PrivateRoute>} />

//           {/* Default redirect */}
//           <Route path="*" element={<Navigate to="/login" />} />
//         </Routes>
//       </BrowserRouter>
//     </AuthProvider>
//   );
// }

// export default App;


import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import { AuthProvider, AuthContext } from "./contexts/AuthContext";
import ProfileView from "./components/ProfileView";
import ProfileEdit from "./components/ProfileEdit";
import FriendRequests from "./components/FriendRequests";
import FriendList from "./components/FriendList";
// import Header from './components/Header'; // Optional global header

// Private Route wrapper
function PrivateRoute({ children }) {
  const { user, initializing } = useContext(AuthContext);

  // Wait while restoring session
  if (initializing) {
    return <p>Loading...</p>; // Ideally, replace with a spinner or loader component
  }

  // Only allow access if user exists
  return user ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        {/* Optionally put <Header /> here if you want it on all protected pages */}

        <Routes>
          {/* Public routes */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />

          {/* Protected routes */}
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/friend-requests" element={<PrivateRoute><FriendRequests /></PrivateRoute>} />
          <Route path="/friends" element={<PrivateRoute><FriendList /></PrivateRoute>} />
          <Route path="/profile/:id" element={<PrivateRoute><ProfileView /></PrivateRoute>} />
          <Route path="/edit-profile" element={<PrivateRoute><ProfileEdit /></PrivateRoute>} />

          {/* Default redirect */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
