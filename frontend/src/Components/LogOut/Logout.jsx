import { useNavigate } from "react-router-dom";
import "../SolarWatch/solar.css";

function Logout() {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('user');
        localStorage.removeItem('userRole');
        navigate('/login');
    }

    return (
        <span onClick={handleLogout} className="logoutButton">Logout</span>
    )
}

export default Logout;