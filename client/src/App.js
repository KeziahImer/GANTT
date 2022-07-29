import './styles/App.css';
import { Routes, Route } from 'react-router-dom'
import Home from './routes/Home'
import Navbar from './routes/Navbar';
import Login from './routes/Login';
import Register from './routes/Register';
import Profile from './routes/Profile'

const App = () => {
  return (
    <div className='App'>
      <div className='Navbar'>
        <Navbar/>
      </div>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/profile' element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
