import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = () => (
  <div id="Navbar">
    <nav>
      <Link to="/">Accueil/</Link>
      <Link to="/register">Register/</Link>
      <Link to="/login">Login/</Link>
      <Link to="/profile">Profile/</Link>
      <Link to="/projects/create">Créer un projet/</Link>
      <Link to="/projects/update">Modifier un projet/</Link>
      <Link to="/projects/delete">Supprimer un projet/</Link>
      <Link to="/projects/addtask">Ajouter une tâche/</Link>
      <Link to="/projects/removetask">Supprimer une tâche/</Link>
      <Link to="/projects">Affichage des projets</Link>
    </nav>
  </div>
);

export default Navbar;
