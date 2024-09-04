import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading/Loading";
import image from "../../BackGrounds/sunset.jpg";
import "../../App.css";


const loginAdmin = async (admin) => {
    try {
        const response = await fetch("/api/user/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(admin)
        });
        if (!response.ok) {
            throw new Error('Login failed!');
        }
        const data = await response.json();
        localStorage.setItem('jwtToken', data.jwt);
    } catch (error) {
        console.error("Error during login: ", error);
    }
}


function AdminLoginForm() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");


    const handleLoginAdmin = async (admin) => {
        setLoading(true);
        try {
            await loginAdmin(admin);
            navigate("/api/admin/solar-watch");
        } catch (error) {
            console.error("Error during login: ", error);
        } finally {
            setLoading(false);

        }
    };

    const onSubmit = (e) => {
        e.preventDefault();
        return handleLoginAdmin({
            username,
            password
        });
    };

    if (loading) {
        return <Loading />
    }

    return (
        <div className="background">
            <div className="containerGlass">
                <div className="FormImage">
                    <img src={image} alt="Login background" className="formBackground"></img>
                </div>
                <form className="Form" onSubmit={onSubmit}>
                    <h1>ADMIN LOGIN</h1>
                    <div className="input-box">
                        <input
                            type="text"
                            placeholder="Username"
                            required
                            onChange={(e) => setUsername(e.target.value)}
                            id="username"
                        />
                    </div>
                    <div className="input-box">
                        <input
                            type="password"
                            placeholder="Password"
                            required
                            onChange={(e) => setPassword(e.target.value)}
                            id="password"
                        />
                    </div>
                    <button>Login</button>
                </form>
            </div>
        </div>
    )

}

export default AdminLoginForm;