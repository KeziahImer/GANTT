import { Button, FormControl, TextField } from '@material-ui/core';
import React, { useState } from 'react'
import { isAuthenticated } from '../Login';
import axios from 'axios'

const Create = () => {
    const [args, setArgs] = useState({
        name: "",
        start: "",
        end: ""
    });

    const handleChange = ({currentTarget}) => {
        const {value, name} = currentTarget;
        setArgs({
            ...args,
            [name]: value
        })
    }

    const handleSubmit = async () => {
        try {
            await axios.post('http://localhost:8000/api/projects/create', args)
        } catch (error) {
            console.log(error)
        }
    }

    if (!isAuthenticated()) {
        return (
            <div>
                <h1>
                  You're not authenticated ! Login before access this page
                </h1>
            </div>
        )
    } else {
        return (
            <div>
                <h1>
                    Here you can create a project.
                </h1>
                <FormControl>
                    <div>
                        <TextField
                        id='name'
                        label='Name'
                        type='text'
                        name='name'
                        onChange={handleChange}
                        />
                    </div>
                    <div>
                        <TextField
                        id='start'
                        type='date'
                        name='start'
                        onChange={handleChange}
                        />
                    </div>
                    <div>
                        <TextField
                        id='end'
                        type='date'
                        name='end'
                        onChange={handleChange}
                        />
                    </div>
                    <div>
                        <br />
                        <Button
                        variant='contained'
                        color='primary'
                        onClick={handleSubmit}
                        >
                            Créer ce projet
                        </Button>
                    </div>
                </FormControl>
            </div>
        )
    }
}

export default Create;
