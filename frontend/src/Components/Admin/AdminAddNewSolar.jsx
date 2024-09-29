import { useState } from "react";
import Header from "../Header/Header";
import Loading from "../Loading/Loading";

const addSolar = async (solar) => {
    const token = localStorage.getItem('jwtToken');
    try {
        const response = await fetch("/api/admin/addNewSolar", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(solar)
        });
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.log("Error during add new solar information", error);
    }
}

function AdminAddNewSolar() {
    const [loading, setLoading] = useState(false);
    const [city, setCity] = useState(null);
    const [date, setDate] = useState(null);
    const [message, setMessage] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);


    const handleAddSolar = async (solar) => {
        setLoading(true);
        try {
            const data = await addSolar(solar);
            if (data !== null) {
                setMessage("You send the data to the database successfully!")
            } else {
                setMessage("Something went wrong, try again later!");
            }
        } catch (error) {
            console.error("Error during add new solar information: ", error);
        } finally {
            setLoading(false);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        handleAddSolar({
            city,
            date
        });
        setIsSubmitted(true);
    }

    if (loading) {
        return <Loading />
    }

    return (
        <>
            <Header />
            <div className="container">
                <div className="item">
                    <h2>Add some new sunset sunrise information!</h2>
                    <div className="form-box addSolar">
                        <form onSubmit={handleSubmit}>
                            <div className="input-box">
                                <input
                                    type="text"
                                    id="city"
                                    required
                                    onChange={(e) => setCity(e.target.value)}
                                ></input>
                                <label htmlFor="city">City</label>
                            </div>
                            <div className="input-box">
                                <input
                                    type="date"
                                    required
                                    onChange={(e) => setDate(e.target.value)}
                                ></input>
                            </div>
                            <button type="submit" className="SubmitBtn">Submit</button>
                        </form>
                        {isSubmitted ?
                            <h2 className="submitMessage">{message}</h2> : <></>}
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminAddNewSolar;