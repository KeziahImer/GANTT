import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'

export default function Navbar() {
  return (
    <div id='Navbar'>
        <nav>
            <Link to='/'>Accueil   </Link>
            <Link to='/users'>Users   </Link>
            <Link to='/login'>Login   </Link>
            <Link to='/register'>Register  </Link>
        </nav>
    </div>
  );
}
