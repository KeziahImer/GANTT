import { Button, FormControl, TextField } from "@material-ui/core";
import React, { useState } from "react";
import axios from "axios";
import { isAuthenticated } from "../Login";

const Remove = () => {
  const [args, setArgs] = useState({});

  const handleChange = ({ currentTarget }) => {
    const { value, name } = currentTarget;
    setArgs({
      ...args,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      await axios.post("http://localhost:8000/api/projects/removetask", args);
    } catch (error) {
      return error;
    }
    return null;
  };

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
      <h1>Ici tu peux supprimer une tâche d&#39;un projet.</h1>
      <FormControl>
        <div>
          <TextField
            id="name"
            label="Project Name"
            type="text"
            name="name"
            onChange={handleChange}
          />
        </div>
        <div>
          <TextField
            id="task"
            label="Task Name"
            type="text"
            name="task"
            onChange={handleChange}
          />
        </div>
        <div>
          <br />
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Supprimer cette tâche du projet
          </Button>
        </div>
      </FormControl>
    </div>
  );
};

export default Remove;
