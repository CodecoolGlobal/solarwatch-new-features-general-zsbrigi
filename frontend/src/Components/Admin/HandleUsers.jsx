import { useEffect, useState } from "react";
import Header from "../Header/Header";
import Loading from "../Loading/Loading";

const getUsers = async () => {
    const token = localStorage.getItem('jwtToken');
    try {
        const response = await fetch("/api/admin/users", {
            method: "GET",
            headers: { "Authorization": `Bearer ${token}` },
        });
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.log("Error during add new solar information", error);
    }
}

function HandleUsers() {
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await getUsers();
                setUsers(data)
            } catch (error) {
                setError(error.message)
            } finally {
                setLoading(false)
            }
        }
        fetchUsers();
    }, [])

    if (loading) {
        return <Loading />
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <>
            <Header />
            <div className="container">
                <div className="userTable">
                    <table>
                        <thead>
                            <tr>
                                <th>Username</th>
                                <th>Role</th>
                                <th>Delete user</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users && users.map((user) => {
                                return (<tr key={user.username} className="user">
                                    <td>{user.username}</td>
                                    <td>{user.role}</td>
                                    <td><button type="button" className="deleteBtn">Delete</button></td>
                                </tr>)
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default HandleUsers;