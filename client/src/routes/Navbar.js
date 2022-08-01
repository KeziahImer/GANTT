import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/Navbar.css'

const Navbar = () => {
  return (
    <div id='Navbar'>
        <nav>
            <Link to='/'>Accueil/</Link>
            <Link to='/register'>Register/</Link>
            <Link to='/login'>Login/</Link>
            <Link to='/profile'>Profile/</Link>
            <Link to='/projects/create'>Gestion de projets/</Link>
            <Link to='/projects/Gantt'>Affichage des projets</Link>
        </nav>
    </div>
  );
}

export default Navbar;
