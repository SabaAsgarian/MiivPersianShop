"use client";
import { createContext, useState, useEffect, useContext } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Auto logout after 1 hour
  useEffect(() => {
    const checkTokenExpiry = () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const payload = JSON.parse(atob(token.split(".")[1]));
          const now = Date.now() / 1000;
          const tokenAge = now - payload.iat; // Token age in seconds
          const oneHour = 60 * 60; // 1 hour in seconds
          
          if (tokenAge >= oneHour) {
            // Auto logout after 1 hour
            logoutUser();
            console.log("User automatically logged out after 1 hour");
          }
        } catch (error) {
          console.error("Error checking token expiry:", error);
          logoutUser();
        }
      }
    };

    // Check immediately
    checkTokenExpiry();

    // Check every 5 minutes
    const interval = setInterval(checkTokenExpiry, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (savedUser && token) {
      const data = JSON.parse(savedUser);
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser); 
      // Log the full data to see if these fields are there
      console.log("Saved User Data:", data); // اینجا بررسی کنید که داده‌ها چه مقادیری دارند

      setUser({
        ...data, // تمام داده‌ها را گرفته و بررسی کنید که مقادیر موجود در اینجا درسته
        mobile: data.mobile , // جلوگیری از undefined
        id:data.id,
        city: data.city , 
        street: data.street , 
        age: data.age ,
      });
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, []);
  
  const loginUser = (userData, token) => {
    localStorage.setItem("user", JSON.stringify(userData)); // Save all the fields to localStorage
    localStorage.setItem("token", token);
    setUser(userData); // Set all fields in the context
  };

//   const loginUser = (userData, token) => {
//     localStorage.setItem("user", JSON.stringify(userData));
//     localStorage.setItem("token", token);
//     setUser(userData);
//     setUser({
//       ...userData,
//       mobile: userData.mobile || "",
//       city: userData.city || "",
//       street: userData.street || "",
//       age: userData.age || 0,
//     });
//   };

  const logoutUser = () => {
    // Clear only user-related localStorage items
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    // Keep cart and other non-user data
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser, loginUser, logoutUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
