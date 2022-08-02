import { Button, FormControl, TextField } from '@material-ui/core';
import React, { useState } from 'react'
import { isAuthenticated } from '../Login';
import axios from 'axios'

const Add = () => {
    const [args, setArgs] = useState({
        name: "",
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
            await axios.post('http://localhost:8000/api/projects/addtask', args)
        } catch (error) {
            console.log(error)
        }
    }

    if (!isAuthenticated()) {
        return (
            <div>
                <h1>
                Tu n'es pas authentifié ! Connecte toi avant de pouvoir accéder à cette page.
                </h1>
            </div>
        )
    } else {
        return (
            <div>
                <h1>
                    Ici tu peux ajouter une tâche à un projet.
                </h1>
                <FormControl>
                    <div>
                        <TextField
                        id='name'
                        label='Project Name'
                        type='text'
                        name='name'
                        onChange={handleChange}
                        />
                    </div>
                    <div>
                        <TextField
                        id='task'
                        label='Task Name'
                        type='text'
                        name='task'
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
                            Ajouter cette tâche sur ce projet
                        </Button>
                    </div>
                </FormControl>
            </div>
        )
    }
}

export default Add;
