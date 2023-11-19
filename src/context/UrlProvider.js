import { createContext, useContext, useState } from "react";

const UrlContext = createContext();

export const UrlProvider = ({ children }) => {
  const [url, setUrl] = useState("http://127.0.0.1:8000/api");

  return (
    <UrlContext.Provider value={{ url, setUrl }}>
      {children}
    </UrlContext.Provider>
  );
};

export const useUrl = () => {
  return useContext(UrlContext);
};
