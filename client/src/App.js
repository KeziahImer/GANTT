import './styles/App.css';
import { Routes, Route } from 'react-router-dom'
import Home from './routes/Home'
import Navbar from './routes/Navbar'
import Login from './routes/Login'
import Register from './routes/Register'
import Profile from './routes/Profile'
import Create from './routes/projects/Create'
import Gantt from './routes/projects/Gantt'
import Delete from './routes/projects/Delete'
import Update from './routes/projects/Update'
import Add from './routes/tasks/Add';
import Remove from './routes/tasks/Remove';

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
        <Route path='/projects/delete' element={<Delete />} />
        <Route path='/projects/update' element={<Update />} />
        <Route path='/projects/addtask' element={<Add />} />
        <Route path='/projects/removetask' element={<Remove />} />
      </Routes>
    </div>
  );
}

export default App;
