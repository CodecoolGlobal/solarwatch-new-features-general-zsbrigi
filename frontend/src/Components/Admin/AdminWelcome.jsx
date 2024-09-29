import { useEffect, useState } from "react";
import Header from "../Header/Header";


function AdminWelcome() {
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
            <Header />
            <div className="container">
                <div className="item">
                    <h1 className="welcome">Welcome back, {name}! </h1>
                </div>
            </div>
        </div>
    )
}

export default AdminWelcome;