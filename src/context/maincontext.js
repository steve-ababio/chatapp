import React, {useState} from 'react';

export const authcontext = React.createContext({auth:false,setauth:()=>{}});
const AuthContext = props=>{
    const [auth,setauth] = useState(false); 
    return(
        <authcontext.Provider value={{auth,setauth}}>
            {props.children}
        </authcontext.Provider>
    )
}

export default AuthContext;
