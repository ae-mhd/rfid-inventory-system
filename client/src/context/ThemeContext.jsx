import { useState } from "react";
import { createContext } from "react";
import { useContext } from "react";



const ThemeContext = createContext();
export function useThemeContext() {
    if (!ThemeContext) {
        throw Error('Context not founed')
    }
    return useContext(ThemeContext);
}

export function ThemeProvider({ children }) {
    const storedTheme = localStorage?.theme
    storedTheme && document.documentElement.classList.add(storedTheme);
    const [theme, setTheme] = useState(storedTheme);
    const handleThemeChange = () => {

        if (
            storedTheme === 'dark') {
            setTheme("");
            localStorage.removeItem('theme')
            document.documentElement.classList.remove("dark");
        } else {
            setTheme("dark");
            localStorage.setItem('theme', 'dark')
            document.documentElement.classList.add("dark");
        }
    };
    return <ThemeContext.Provider
        value={{
            theme,
            toggleTheme: handleThemeChange,
        }}>
        {children}
    </ThemeContext.Provider>

}