import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading/Loading";
import dawn from "../../BackGrounds/dawn.jpg";
import "../../App.css";

function createUser(user) {
    return fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json", },
        body: JSON.stringify(user),
    }).then((res) => {
        if (res.status === 201) {
            return res;
        } else {
            return res.text().then(text => { throw new Error(text) });

        }
    })
        .catch(error => {
            console.log("Error in createUser:", error);
            throw error;
        });
}

function RegistrationForm() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleCreateUser = (e) => {
        e.preventDefault();
        setLoading(true);
        const user = { username, password };
        createUser(user)
            .then(() => {
                setLoading(false);
                navigate("/login");
            })
    }

    if (loading) {
        return <Loading />
    }

    return (
        <div className="background">
            <div className="containerGlassSignUp">
                <div className="registrationImage">
                    <img src={dawn} alt="Sign up background" className="formBackground"></img>
                    <div className="welcome">Welcome Back!</div>
                    <div className="welcomeLogin">If you already have an account, click the login button to sign in!</div>
                    <button className="loginOnSignUp" onClick={() => navigate("/login")}>Login</button>
                </div>
                <form className="signUpForm" onSubmit={handleCreateUser}>
                    <h1 className="createHeader">Create Account</h1>
                    <div className="input-boxRegister">
                        <input
                            type="text"
                            placeholder="Username"
                            required
                            onChange={(e) => setUsername(e.target.value)}
                            id="usernameRegister"
                        />
                    </div>
                    <div className="input-boxRegister">
                        <input
                            type="password"
                            placeholder="Password"
                            required
                            onChange={(e) => setPassword(e.target.value)}
                            id="passwordRegister"
                        />
                    </div>
                    <button className="SignUpBtn" type="submit">Sign Up</button>
                </form>
            </div>
        </div>
    )

}

export default RegistrationForm;