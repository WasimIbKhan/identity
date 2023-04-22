import React, { useCallback, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import './login.css'
import { useDispatch } from 'react-redux';
import * as authAction from '../store/actions/auth'
import ReactLoading from "react-loading";
import { Link } from 'react-router-dom';

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const loginAction = useCallback(async() => {
        setLoading(true)
        await dispatch(authAction.login(email,password))
        setLoading(false)
        navigate('/dashboard')

    },[dispatch, email, password])

    const signupAction = useCallback(async() => {
        setLoading(true)
        await dispatch(authAction.login(email,password)).then(
            setLoading(false)
        )
        navigate('/signup')

    },[dispatch, email, password])

    if(isLoading) {
        return(
            <ReactLoading type={'spokes'} color={'black'} height={'20%'} width={'20%'} />
        )
    }
    return(
        <div className='page'>
            <div className='container'>
                <div>
                    <input className="email" placeholder="email" type="email" id="email"  onChange={event => setEmail(event.target.value)} required></input>
                    <input className="password" placeholder="Password" type="password" id="password" required minLength="5"  onChange={event => setPassword(event.target.value)}></input>
                    <input className="login" type="submit" onClick={loginAction}/>
                    <div className='name' onClick={signupAction}>Signup</div>
                </div>
            </div>
        </div>
        
    )
}
export default Login;