import { useEffect, useState } from "react";
import Logout from "../LogOut/Logout";


function AdminSolarWatch() {
    const [name, setName] = useState("");

    const welcomeBack = async () => {
        const token = localStorage.getItem('jwtToken');
        const response = await fetch("api/admin/me", {
            method: "GET",
            headers: { "Authorization": `Bearer ${token}`, },
        });
        if (response.ok) {
            const data = await response.text()
            return data;
        } else {
            throw new Error('You are not supposed to be here!');
        }
    }

    useEffect(() => {
        const fetchName = async () => {
            const data = await welcomeBack();
            setName(data);
        }
        fetchName();
    }, [])

    return (
        <div>
            <nav>
                <span>Add more solar</span>
                <span>Delete solar</span>
                <span>Handle users</span>
                <Logout />
            </nav>
            <h1>Welcome back, {name}! </h1>
        </div>
    )
}

export default AdminSolarWatch;