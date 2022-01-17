import React ,{useEffect} from 'react';
import useForm from '../../hooks/formhook';
import useAuthentication from '../../hooks/useAuthentication';

const WithAuth = (Wrappedcomponent,URL)=>{
   
    const Auth = props =>{
        const [username,handleUsername] = useForm();
        const [password,handlePassword] = useForm();
        const usercredentials = Object.assign({},{username,password});           
       const[submitCredentials,isloginprocessing,response] = useAuthentication(URL.LOGIN_URL,usercredentials);
       
        return(
            <Wrappedcomponent
                {...props} 
                handleUsername={handleUsername}
                handlePassword={handlePassword}
                isloginprocessing={isloginprocessing}
                submitCredentials={submitCredentials}
                response ={response}
            />
        )
    }
    return Auth
}

export default WithAuth;