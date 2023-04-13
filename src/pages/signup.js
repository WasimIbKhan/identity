import React, { useCallback, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import './signup.css'
import { useDispatch } from 'react-redux';
import * as authAction from '../store/actions/auth'
import ReactLoading from "react-loading";
import { Link } from 'react-router-dom';

function Signup() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(false)
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [confirmedPassword, setConfirmedPassword] = useState('')

    const signupAction = useCallback(async() => {
        setLoading(true)
        await dispatch(authAction.login(email,password))
        setLoading(false)
        navigate('/')

    },[dispatch, email, password])

    if(isLoading) {
        return(
            <ReactLoading type={'spokes'} color={'black'} height={'20%'} width={'20%'} />
        )
    }
    return(
        <div className='page'>
            <div className='signup_container'>
                <div>
                    <input className="inputBox" placeholder="email" type="email" id="email"  onChange={event => setEmail(event.target.value)} required></input>
                    <input className="inputBox" placeholder="name" type="text" id="name"  onChange={event => setName(event.target.value)} required></input>
                    <input className="inputBox" placeholder="Password" type="password" id="password" required minLength="5"  onChange={event => setPassword(event.target.value)}></input>
                    <input className="inputBox" placeholder="Confirm Password" type="password" id="password" required minLength="5"  onChange={event => setConfirmedPassword(event.target.value)}></input>                    
                    <input className="Signup" placeholder='Login' type="submit" onClick={signupAction}/>
                    <div className='name' onClick={signupAction}>Login</div>
                </div>
            </div>
        </div>
        
    )
}
export default Signup;