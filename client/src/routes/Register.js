import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import { Button } from '@material-ui/core'
import axios from 'axios'

const sendData = async credentials => {
    const res = await axios.post('http://localhost:3000/api/auth/register', credentials)
    console.log(res)
    console.log(res.data)
}

const Register = () => {
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
            await sendData(credentials)
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div>
        <h1>
            Register
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
                    S'inscrire
                </Button>
            </div>
        </form>
    </div>
  )
}

export default Register;
