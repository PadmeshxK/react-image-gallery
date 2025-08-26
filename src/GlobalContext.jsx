import { createContext, useContext, useEffect, useState } from "react";


const GlobalContext = createContext();

const getInitialDarkMode = () => {
  const prefersDarkMode = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;
  const storedDarkMode = localStorage.getItem("darkTheme");

  if (storedDarkMode === null) {
    return prefersDarkMode;
  }

  return storedDarkMode === "true";
};

export const useGlobalContext = ()=> useContext(GlobalContext);

const AppContext = ({children})=>{
    const [isDarkTheme,setIsDarkTheme] = useState(getInitialDarkMode());
    const [searchTerm,setSearchTerm] = useState('cat')
    const toggleDarkTheme = ()=>{
        setIsDarkTheme((prevState)=>{
            localStorage.setItem('darkTheme',!prevState)
            return !prevState;
        });
    }
    useEffect(()=>{
        document.body.classList.toggle('body-dark-theme',isDarkTheme);
    },[isDarkTheme])
    return(
        <GlobalContext.Provider value={{isDarkTheme,toggleDarkTheme,searchTerm,setSearchTerm}}>
            {children}
        </GlobalContext.Provider>
    )
}

export default AppContext;