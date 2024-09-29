import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../Loading/Loading";
import { FaUser } from "react-icons/fa";
import { MdLock } from "react-icons/md";
import Header from "../Header/Header";
import "../../App.css";
import { useAuth } from "../../AuthProvider";

const loginUser = async (user) => {
    try {
        const response = await fetch("/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user)
        });
        if (!response.ok) {
            throw new Error('Login failed!');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error during login: ", error);
    }

}

function LoginForm() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useAuth();



    const handleLoginUser = async (user) => {
        setLoading(true);
        try {
            const data = await loginUser(user);
            localStorage.setItem('jwtToken', data.jwt);
            localStorage.setItem('user', JSON.stringify(data));
            localStorage.setItem('userRole', data.roles[0]);
            login({ data });
            data.roles[0] === "ROLE_ADMIN" ? navigate("/admin-welcome") : navigate("/solar-watch");
        } catch (error) {
            console.error("Error during login: ", error);
        } finally {
            setLoading(false);

        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        return handleLoginUser({
            username,
            password
        });
    };


    if (loading) {
        return <Loading />
    }

    return (
        <>
            <Header />
            <div className="container">
                <div className="item">
                    <h2>Solar Watch</h2>
                    <div className="text-item">
                        <h2>Welcome!</h2>
                        <p>This platform allows you to retrieve sunrise and sunset information for any location worldwide at any time. All you need to do is provide the city and date. </p>
                    </div>
                </div>
                <div className={`login-section`}>
                    <div className="form-box login">
                        <form onSubmit={handleSubmit}>
                            <h2>Sign In</h2>
                            <div className="input-box">
                                <span className="icon"><FaUser className="icons" /></span>
                                <input
                                    type="text"
                                    id="username"
                                    required
                                    onChange={(e) => setUsername(e.target.value)}
                                ></input>
                                <label htmlFor="username">Username</label>
                            </div>
                            <div className="input-box">
                                <span className="icon"><MdLock className="icons" /></span>
                                <input
                                    type="password"
                                    id="password"
                                    required
                                    onChange={(e) => setPassword(e.target.value)}
                                ></input>
                                <label htmlFor="password">Password</label>
                            </div>
                            <button className="loginBtn" type="submit">Login</button>
                            <p className="signUpLink">Do not have an account? <Link to={"/registration"} className="link">Sign up now</Link></p>
                        </form>
                    </div>
                </div>
            </div >
        </>
    )

}

export default LoginForm;