import { usePost } from "@/hooks/fetchData";
import { createContext, useEffect } from "react";
import { useContext } from "react";



const globalContext = createContext();
export function useGlobalContext() {
    if (!globalContext) {
        console.log('Context not founed')
        throw Error('Context not founed')
    }
    return useContext(globalContext);
}

export function GlobalProvider({ children }) {


    return <globalContext.Provider
        value={{

        }}>
        {children}
    </globalContext.Provider>

}