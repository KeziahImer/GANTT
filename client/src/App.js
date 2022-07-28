import './App.css';
import { Routes, Route } from 'react-router-dom'
import Home from './components/Home/Home'
import Navbar from './components/Navbar/Navbar';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Users from './components/Users/Users'

function App() {
  return (
    <div className='App'>
      <div className='Navbar'>
        <Navbar/>
      </div>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/users' element={<Users />} />
      </Routes>
    </div>
  );
}

export default App;
