import { Button, FormControl, TextField } from "@material-ui/core";
import React, { useState } from "react";
import axios from "axios";
import { isAuthenticated } from "../Login";

const Delete = () => {
  const [args, setArgs] = useState({
    name: "",
  });

  const handleChange = ({ currentTarget }) => {
    const { value } = currentTarget;
    setArgs({
      ...args,
      name: value,
    });
  };

  const handleSubmit = async () => {
    try {
      await axios.delete(
        `http://localhost:8000/api/projects/delete/${args.name}`
      );
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
      <h1>Ici tu peux supprimer un projet.</h1>
      <FormControl>
        <div>
          <TextField
            id="name"
            label="Name"
            type="text"
            name="name"
            onChange={handleChange}
          />
        </div>
        <div>
          <br />
          <Button variant="contained" color="secondary" onClick={handleSubmit}>
            Supprimer le projet
          </Button>
        </div>
      </FormControl>
    </div>
  );
};

export default Delete;
