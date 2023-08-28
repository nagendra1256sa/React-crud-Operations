import React, { ChangeEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import '../App.css'

const Login = () => {
    const navigate = useNavigate();
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [submit, setSubmit] = useState(false)
    const handleLoginU = (e: ChangeEvent<HTMLInputElement>) => {
        setUserName(e.target.value);
        setSubmit(false);
    }
    const handleLoginP = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        setSubmit(false);
    }
    const validForm=()=>
    {
        return password.trim()!==''&&userName.trim() !=='';
    }
    const isPasswordValid=()=>
    {
        let c=1,d=1,e=1,f=1;
        for(let i=0;i<password.length;i++)
        {
            if(password.charAt(i)>='A'&&password.charAt(i)<='Z')
            c=0;
            else if(password.charAt(i)>='a'&&password.charAt(i)<='z')
            d=0;
            else if(password.charAt(i)>='0'&&password.charAt(i)<='9')
            e=0;
            else
            f=0;
        }
        if(c===0&&d===0&&e===0&&f===0)
        {
            return true;
        }
        return false;
    }
    const handleValid=()=>
    {
        if(validForm())
        {
            if(!isPasswordValid())
            {
              console.log("passWord is not valid");
              return;
            }
            navigate("/list")
        }
        else
        setSubmit(true)
    }
    return (<div className='login-container'>
        <div className='login-form'>
            <h2>Login</h2>
            <input style={{"marginBottom":"10px"}} type="text"
                value={userName}
                placeholder="Enter userName"
                onChange={handleLoginU} />
            {submit && userName===""&&<span className='error-message'>Please Enter name</span>}
            <input type="text"
                value={password}
                placeholder="Enter Password"
                onChange={handleLoginP} />
            {submit && password===""&& <span className='error-message'>Please Enter password</span>}
            {submit && !isPasswordValid() &&(<span className='error-message'>Password must be a digit, special character, and letter.</span>)}
            <br />
            <button className='login-button' onClick={handleValid}>Login</button>
        </div>
    </div>)
}
export default Login