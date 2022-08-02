import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FormControl, TextField, Button } from '@material-ui/core';
import { isAuthenticated,  } from './Login';
import jwtDecode from 'jwt-decode';
import axios from 'axios';

const Profile = () => {
  const navigate = useNavigate()

  const token = window.localStorage.getItem("authToken")
  if (token) {
    var {userId} = jwtDecode(token)
  }

  const [credentials, setCredentials] = useState({
    id: userId,
    password: ""
});

  const handleUpdate = async () => {
    try {
      await axios.post('http://localhost:8000/api/auth/profile', credentials)
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8000/api/auth/profile/${userId}`)
      window.localStorage.removeItem('authToken')
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }

  const handleLogout = () => {
    try {
      window.localStorage.removeItem('authToken')
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }

  const handleChange = ({currentTarget}) => {
    const value = currentTarget.value;
    setCredentials({
        ...credentials,
        password: value
    })
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
          Ici tu peux te déconnecter, modifier ton compte ou le supprimer.
        </h1>
          <FormControl>
            <TextField
            id='password'
            label='New Password'
            type='password'
            name='password'
            onChange={handleChange}
            />
            <div>
                <br />
                <Button
                variant='contained'
                color='primary'
                onClick={handleUpdate}
                >
                    Modifier le mot de passe
                </Button>
                <br />
                <br />
                <Button
                variant='contained'
                color='secondary'
                onClick={handleDelete}
                >
                  Supprimer le compte
                </Button>
                <br />
                <br />
                <Button
                variant='contained'
                onClick={handleLogout}
                >
                  Déconnexion
                </Button>
            </div>
          </FormControl>
      </div>
    )
  }
}

export default Profile;
