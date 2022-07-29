import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/Navbar.css'

const Navbar = () => {
  return (
    <div id='Navbar'>
        <nav>
            <Link to='/'>Accueil   </Link>
            <Link to='/profile'>Profile   </Link>
            <Link to='/login'>Login   </Link>
            <Link to='/register'>Register  </Link>
        </nav>
    </div>
  );
}

export default Navbar;
