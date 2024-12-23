import { useState } from "react";
import { createContext } from "react";
import { useContext } from "react";
import { Navigate, redirect } from "react-router-dom";



const authContext = createContext();
export function useAuthContext() {
    if (!authContext) {
        throw Error('Context not founed')
    }
    return useContext(authContext);
}

export function AuthProvider({ children }) {

    const storedUser = localStorage.user ? JSON.parse(localStorage.user) : null
    const [user, setUser] = useState(storedUser);

    const logOut = () => {
        localStorage.removeItem('user')
        setUser(null)
        return redirect('/login')
    }

    // if (user) return <Navigate to='/' />
    return <authContext.Provider
        value={{
            setUser,
            user,
            logOut
        }}>
        {children}
    </authContext.Provider>

}