import "./startpage.css";
import { IoSearch } from "react-icons/io5";
import Logout from "../LogOut/Logout";

function Header() {
    const token = localStorage.getItem('jwtToken');
    const userRole = localStorage.getItem("userRole");

    return (
        <>
            <div className="background"></div>
            <header className="header">
                <nav className="navbar">
                    <a href={userRole === "ROLE_ADMIN" ? "/admin-welcome" : userRole === "ROLE_USER" ? "/solar-watch" : "/login"}>Home</a>
                    {token ? <></> : <a href="/login">Login</a>}
                    {token ? <></> : <a href="/registration">Create Account</a>}
                    {userRole === "ROLE_ADMIN" ? <a href="/admin-add-new-solar">Add more solar</a> : <></>}
                    {userRole === "ROLE_ADMIN" ? <a href="/admin-handle-users">Handle users</a> : <></>}
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

export default Header;