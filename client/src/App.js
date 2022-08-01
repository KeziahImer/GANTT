import './styles/App.css';
import { Routes, Route } from 'react-router-dom'
import Home from './routes/Home'
import Navbar from './routes/Navbar';
import Login from './routes/Login';
import Register from './routes/Register';
import Profile from './routes/Profile'
import Create from './routes/projects/Create'
import Gantt from './routes/projects/Gantt'

const App = () => {
  return (
    <div className='App'>
      <div className='Navbar'>
        <Navbar/>
      </div>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/projects/create' element={<Create />} />
        <Route path='/projects/Gantt' element={<Gantt />} />
      </Routes>
    </div>
  );
}

export default App;
