import React from 'react'
import TextField from '@material-ui/core/TextField'
import { Button } from '@material-ui/core'

export default function Login() {
  return (
    <div>
        <h1>
            Login
        </h1>
        <form>
            <div>
                <TextField
                id='email'
                label='Email'
                type='text'
                name='email'
                />
            </div>
            <div>
                <TextField
                id='password'
                label='Password'
                type='text'
                name='password'
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

