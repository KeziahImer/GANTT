import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import { Button } from '@material-ui/core'
import axios from 'axios'
import jwtDecode from 'jwt-decode'

const authenticate = async credentials => {
    const res = await axios.post('http://localhost:3000/api/auth/login', credentials)
    const data = res.data
    window.localStorage.setItem("authToken", data.token)
    axios.defaults.headers["Authorization"] = 'Bearer ' + data.token
}

const isAuthenticated = () => {
    const token = window.localStorage.getItem("authToken")
    if (token) {
        const {exp} = jwtDecode(token)
        if (exp * 1000 > new Date().getTime()) {
            return true
        }
    }
    return false
}

const Login = () => {
    const [credentials, setCredentials] = useState({
        email: "",
        password: ""
    });

    const handleChange = ({currentTarget}) => {
        const {value, name} = currentTarget;
        setCredentials({
            ...credentials,
            [name]: value
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await authenticate(credentials)
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div>
        <h1>
            Login
        </h1>
        <form onSubmit={handleSubmit}>
            <div>
                <TextField
                id='email'
                label='Email'
                type='text'
                name='email'
                onChange={handleChange}
                />
            </div>
            <div>
                <TextField
                id='password'
                label='Password'
                type='password'
                name='password'
                onChange={handleChange}
                />
            </div>
            <div>
                <br />
                <Button
                variant='contained'
                color='primary'
                type='submit'
                >
                    Se connecter
                </Button>
            </div>
        </form>
    </div>
  )
}

export {isAuthenticated};
export default Login;
