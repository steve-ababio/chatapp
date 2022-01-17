import React ,{useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import {URL} from '../../../utility/url';
import { LOCALSTORAGE_SET_ITEM } from '../../../utility/localstorage';
import WithAuth from '../../../components/hoc/auth-hoc' 
import '../style/auth.css'


const Signin = props =>{        
    const history = useHistory();  
     
    useEffect(()=>{
        if(props.response.isauth && props.response.token){
            LOCALSTORAGE_SET_ITEM("__userID",props.response.userID)
            LOCALSTORAGE_SET_ITEM("__auth_",props.response.token)
            LOCALSTORAGE_SET_ITEM("user_name",props.response.username)
            history.push({
                pathname: '/dashboard',
            })
        } 
    },[props.response,history])

   return(
       <div className='auth-ctn'>
            <h1 class="auth-title"> please sign in</h1>
            <form className="auth-modal" >
                <label className="auth-input-labels" htmlFor="username" >Username</label>
                <input type="text" required id="username"  name="username" className="auth-form-inputs" onChange={props.handleUsername} autoComplete='username' />
                <label className="auth-input-labels" htmlFor="password">Password</label>
                <input type="password" required id="password" name="password" className="auth-form-inputs" onChange = {props.handlePassword} autoComplete='password' /> 
                <button className={props.isloginprocessing ? "auth-submit-btn auth-btn-disabled":"auth-submit-btn"} disabled={props.isloginprocessing}  onClick={props.submitCredentials}>login</button>
            </form>
        </div>
    )
}
export default WithAuth(Signin,URL.LOGIN_URL);