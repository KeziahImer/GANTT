import { Button, FormControl, TextField } from '@material-ui/core';
import React, { useState } from 'react'
import { isAuthenticated } from '../Login';
import axios from 'axios'

const Remove = () => {
    const [args, setArgs] = useState({});

    const handleChange = ({currentTarget}) => {
        const {value, name} = currentTarget;
        setArgs({
            ...args,
            [name]: value
        })
    }

    const handleSubmit = async () => {
        try {
            await axios.post('http://localhost:8000/api/projects/removetask', args)
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
                    Ici tu peux supprimer une tâche d'un projet.
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
                            Supprimer cette tâche du projet
                        </Button>
                    </div>
                </FormControl>
            </div>
        )
    }
}

export default Remove;
