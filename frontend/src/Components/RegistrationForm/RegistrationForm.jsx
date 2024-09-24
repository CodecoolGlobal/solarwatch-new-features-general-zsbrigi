import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../Loading/Loading";
import { FaUser } from "react-icons/fa";
import { MdLock } from "react-icons/md";
import Header from "../Header/Header";
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
                    <div className="form-box register">
                        <form onSubmit={handleCreateUser}>
                            <h2>Create Account</h2>
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
                            <button className="loginBtn" type="submit">Sign Up</button>
                            <p className="signUpLink">Already have an account? <Link to={"/login"} className="link" >Login</Link></p>
                        </form>
                    </div>
                </div>
            </div >
        </>
    )

}

export default RegistrationForm;