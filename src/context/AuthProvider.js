import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  let x = localStorage.getItem("loggedInUser");
  x = JSON.parse(x);
  const [loggedInUser, setLoggedInUser] = useState(x);

  return (
    <AuthContext.Provider value={{ loggedInUser, setLoggedInUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
