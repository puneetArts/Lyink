// import React, { createContext, useState, useEffect } from "react";
// import axios from "axios";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [initializing, setInitializing] = useState(true);

//   useEffect(() => {
//     const storedToken = localStorage.getItem("token");
//     const storedUser = localStorage.getItem("user");

//     if (storedToken && storedUser) {
//       setUser({ ...JSON.parse(storedUser), token: storedToken });

//       axios
//         .get("http://localhost:5000/api/users/me", {
//           headers: { Authorization: `Bearer ${storedToken}` }
//         })
//         .then((res) => {
//           setUser({ ...res.data, token: storedToken });
//           localStorage.setItem("user", JSON.stringify(res.data));
//         })
//         .catch(() => {
//           localStorage.removeItem("token");
//           localStorage.removeItem("user");
//           setUser(null);
//         })
//         .finally(() => {
//           setInitializing(false);
//         });
//     } else {
//       setInitializing(false);
//     }
//   }, []);

//   const login = async (token) => {
//     try {
//       localStorage.setItem("token", token);
//       const res = await axios.get("http://localhost:5000/api/users/me", {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       const userData = { ...res.data, token };
//       setUser(userData);
//       localStorage.setItem("user", JSON.stringify(res.data));
//     } catch (err) {
//       logout();
//     }
//   };

//   const logout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout, initializing }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };


import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      setUser({ ...JSON.parse(storedUser), token: storedToken });

      axios
        .get(`${import.meta.env.VITE_API_URL}/api/users/me`, {
          headers: { Authorization: `Bearer ${storedToken}` }
        })
        .then((res) => {
          setUser({ ...res.data, token: storedToken });
          localStorage.setItem("user", JSON.stringify(res.data));
        })
        .catch(() => {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          setUser(null);
        })
        .finally(() => {
          setInitializing(false);
        });
    } else {
      setInitializing(false);
    }
  }, []);

  const login = async (token) => {
    try {
      localStorage.setItem("token", token);
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/users/me`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const userData = { ...res.data, token };
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(res.data));
    } catch (err) {
      logout();
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, initializing }}>
      {children}
    </AuthContext.Provider>
  );
};
