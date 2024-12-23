import { useState } from "react";
import { createContext } from "react";
import { useContext } from "react";



const SidebarContext = createContext();
export function useSidebarContext() {
    if (!SidebarContext) {
        throw Error('Context not founed')
    }
    return useContext(SidebarContext);
}

export function SidebarProvider({ children }) {

    const [expanded, setExpanded] = useState(true)
    const toggleSidebar = () => setExpanded(curr => !curr)
    return <SidebarContext.Provider
        value={{ expanded, toggleSidebar, setExpanded }}>
        {children}
    </SidebarContext.Provider>

}