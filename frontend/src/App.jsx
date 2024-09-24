
import './App.css'
import Header from "./Components/Header/Header";
import { Route, Routes, useNavigate } from 'react-router-dom';
import LoginForm from './Components/LoginForm/LoginForm';
import RegistrationForm from './Components/RegistrationForm/RegistrationForm';
import MainPage from './Pages/MainPage/MainPage';


function App() {
  const token = localStorage.getItem('jwtToken');

  return (
    <>
      <Routes>
        <Route path='/' element={token ? <MainPage /> : <LoginForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/registration" element={<RegistrationForm />} />
        <Route path='/solar-watch' element={<MainPage />} />
      </Routes>
    </>
  )
}

export default App
