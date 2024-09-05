import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../Loading/Loading";
import image from "../../BackGrounds/sunset.jpg";
import "../../App.css";

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
        localStorage.setItem('jwtToken', data.jwt);
    } catch (error) {
        console.error("Error during login: ", error);
    }

}

function LoginForm() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");


    const handleLoginUser = async (user) => {
        setLoading(true);
        try {
            await loginUser(user);
            navigate("/solar-watch");
        } catch (error) {
            console.error("Error during login: ", error);
        } finally {
            setLoading(false);

        }
    };

    const onSubmit = (e) => {
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
        <div className="background">
            <div className="containerGlass">
                <div className="FormImage">
                    <img src={image} alt="Login background" className="formBackground"></img>
                </div>
                <form className="Form" onSubmit={onSubmit}>
                    <h1 className="loginHeader">Login</h1>
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
                    <button className="loginBtn">Login</button>
                    <p className="signUpLink">Do not have an account? <Link to={"/registration"}>Sign up now</Link></p>
                </form>
            </div>
        </div>
    )

}

export default LoginForm;