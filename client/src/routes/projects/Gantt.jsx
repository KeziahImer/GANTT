import { Button } from '@material-ui/core';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { isAuthenticated } from '../Login';

const Overview = () => {
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);

  const getProjects = async () => {
    try {
      const { userId } = await jwtDecode(
        window.localStorage.getItem('authToken')
      );
      const res = await axios.get(
        `http://localhost:8000/api/projects/get/${userId}`
      );
      setProjects(res.data);
    } catch (error) {
      return error;
    }
    return null;
  };

  const goTo = (id) => {
    navigate(`/projects/view/${id}`, { state: { userId: id } });
  };

  if (projects.length === 0) getProjects();

  if (!isAuthenticated()) {
    return (
      <div>
        <h1>
          Tu n&#39;es pas authentifié ! Connecte toi avant de pouvoir accéder à
          cette page.
        </h1>
      </div>
    );
  }
  return (
    <div>
      <div>
        <h1>Choisis un projet :</h1>
      </div>
      <div>
        {projects.map((project) => (
          <div>
            <Button onClick={() => goTo(project._id)}>{project.name}</Button>
            <br />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Overview;
