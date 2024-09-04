import { useNavigate } from "react-router-dom";
import "../SolarWatch/solar.css";

function Logout() {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('jwtToken');
        navigate('/login');
    }

    return (
        <button onClick={handleLogout} className="logoutButton">Logout</button>
    )
}

export default Logout;