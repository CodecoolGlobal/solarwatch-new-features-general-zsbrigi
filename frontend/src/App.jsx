
import './App.css'
import { Route, Routes } from 'react-router-dom';
import MainPage from './Pages/MainPage/MainPage';
import AdminSolar from './Pages/Admin/AdminSolar';
import Login from './Pages/Login/Login';
import Registration from './Pages/Registration/Registration';
import { ProtectedRoute } from './ProtectedRoute';
import AdminAddNewSolar from './Components/Admin/AdminAddNewSolar';
import HandleUsers from './Components/Admin/HandleUsers';


function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<ProtectedRoute role={"ROLE_USER"}><MainPage /></ProtectedRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path='/solar-watch' element={<ProtectedRoute role={"ROLE_USER"}><MainPage /></ProtectedRoute>} />
        <Route path='/admin-welcome' element={<ProtectedRoute role={"ROLE_ADMIN"}><AdminSolar /></ProtectedRoute>} />
        <Route path='/admin-add-new-solar' element={<ProtectedRoute role={"ROLE_ADMIN"}><AdminAddNewSolar /></ProtectedRoute>} />
        <Route path='/admin-handle-users' element={<ProtectedRoute role={"ROLE_ADMIN"}><HandleUsers /></ProtectedRoute>} />
      </Routes>
    </>
  )
}

export default App
