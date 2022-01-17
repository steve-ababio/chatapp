import React from 'react';
import {Redirect, Route} from 'react-router-dom';

function ProtectedRoute ({component:Component,...rest}){
    

   return( <Route {...rest} 
      render={ props=>(
         localStorage.getItem("__auth_") ? <Component {...props}/> : <Redirect to = "/login" />)
      }/>
      )        
}
export default ProtectedRoute;