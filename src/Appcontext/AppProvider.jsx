import { children, createContext, useContext, useEffect, useState } from "react";


let AppContext = createContext('');

const AppProvider = ({children})=>{
    const [user,setUser] = useState([]);
    const [manager,setManager] = useState([]);
    const [lead,setLead] = useState([]);
    const [contact,setContact] = useState([]);
    const [service,setService] = useState([]);

    return(
        <AppContext.Provider
          value={{user,setUser,manager,setManager,lead,setLead,contact,setContact,service,setService}}>
            {children}
        </AppContext.Provider>
    );
}

export const Appstate = ()=>{
    return useContext(AppContext);
}

export default AppProvider;