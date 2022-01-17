import React,{useEffect,useRef} from 'react';
import WithAuth from '../../../components/hoc/auth-hoc' 
import {URL} from '../../../utility/url';
import '../style/auth.css'

const Signup = props=>{
    let passwordvalidationMsgRef = useRef(null);
    let usernameValidationMsgRef = useRef(null); 
    useEffect(() => {
        if(props.response.status === "success"){
            console.log("registration successful");
        }
    }, [props.response]);

    function checkValidity(e,element){
        let isValid = e.target.validity.valid;
        let message = e.target.validationMessage;

        if(!isValid){
           element.innerText = message;
        }
        else{
            element.innerText ='';
        }
      }
    return(
          <div className="auth-ctn">
            <h1 class="auth-title"> please sign up</h1>
            <form className="auth-modal" >
                <label className="auth-input-labels" htmlFor="signup-username">username (required)</label>
                <input
                    required 
                    type="text" 
                    maxLength={38}
                    id="signup-username"
                    className="auth-form-inputs"
                    onChange={props.handleUsername} 
                    autoComplete="username"
                    onBlur={e=>checkValidity(e,usernameValidationMsgRef.current)}
                    aria-describedby = "signup-username-validation"
                />
                <div className="validation-msg" ref={usernameValidationMsgRef} id="signup-username-validation" aria-live='assertive'></div>
                <label className="auth-input-labels" htmlFor="signup-password">password (required)</label>
                <input 
                    type="password" 
                    id="signup-password" 
                    minLength={8}
                    aria-describedby="password-minlength" 
                    className="auth-form-inputs"
                    required
                    autoComplete="off"
                    onChange = {props.handlePassword}
                    onBlur={e=>checkValidity(e,passwordvalidationMsgRef.current)}
                    aria-describedby="signup-password-validation"
                /> 
                <div className = "validation-msg" ref={passwordvalidationMsgRef} id="signup-password-validation" aria-live='assertive'></div>
                <button className={props.isloginprocessing ? "auth-submit-btn auth-btn-disabled":"auth-submit-btn"} disabled={props.isloginprocessing} onClick={props.submitCredentials}>Signup</button>
            </form>
        </div>
    )
}
export default WithAuth(Signup,URL.SIGNUP_URL);