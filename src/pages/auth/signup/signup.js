import React,{useEffect} from 'react';
import WithAuth from '../../../components/hoc/auth-hoc' 
import {URL} from '../../../utility/url';
import '../style/auth.css'

const Signup = props=>{
    useEffect(() => {
        if(props.response.status === "success"){
            console.log("registration successful");
            //proper notification
        }
    }, [props.response]);
    return(
          <div className="auth-ctn">
            <h1 class="auth-title"> please sign in</h1>
            <form className="auth-modal" >
                <label className="auth-input-labels" htmlFor="signup-username">username (required)</label>
                <input
                    required type="text" 
                    id="signup-username"
                    className="auth-form-inputs"
                    onChange={props.handleUsername} 
                />
                 <label className="auth-input-labels" htmlFor="signup-password">password (required)</label>
                <input 
                    type="password" 
                    id="signup-password" 
                    minLength="8" 
                    aria-describedby="password-minlength" 
                    className="auth-form-inputs"
                    required
                    onChange = {props.handlePassword}
                /> 
                <div id="password-minlength">Enter atleast 8 characters</div>
                <button className={props.isloginprocessing ? "auth-submit-btn auth-btn-disabled":"auth-submit-btn"} disabled={props.isloginprocessing} onClick={props.submitCredentials}>Signup</button>
            </form>
        </div>
    )
}
export default WithAuth(Signup,URL.SIGNUP_URL);