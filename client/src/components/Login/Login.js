import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import { Button } from '@material-ui/core'
import axios from 'axios'

function authenticate(credentials) {
    return axios.post('http://localhost:3000/api/auth/login', credentials)
    .then(res => res.data)
    .then(data => {
        window.localStorage.setItem("authToken", data.token)
        axios.defaults.headers["Authorization"] = 'Bearer ' + data.token
    })
}

export default function Login() {

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
                type='text'
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
