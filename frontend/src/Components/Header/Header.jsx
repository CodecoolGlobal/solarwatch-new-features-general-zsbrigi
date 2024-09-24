import { useNavigate } from "react-router-dom";
import "./startpage.css";
import sunset from "../../BackGrounds/sunsetMain.png";
import { IoSearch } from "react-icons/io5";
import LoginForm from "../LoginForm/LoginForm";
import Logout from "../LogOut/Logout";

function StartPageComp() {
    const token = localStorage.getItem('jwtToken');

    return (
        <>
            <div className="background"></div>
            <header className="header">
                <nav className="navbar">
                    <a href={token ? "/solar-watch" : "/login"}>Home</a>
                    {token ? <></> : <a href="/login">Login</a>}
                    {token ? <></> : <a href="/registration">Create Account</a>}
                    {token ? <a href="/login"><Logout /></a> : <></>}
                </nav>
                <form action="" className="search">
                    <input type="text" placeholder="Search..." />
                    <button><IoSearch /></button>
                </form>
            </header>
        </>
    )
}

export default StartPageComp;