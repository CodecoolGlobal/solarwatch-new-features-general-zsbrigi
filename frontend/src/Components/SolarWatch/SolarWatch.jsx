import { useEffect, useState } from "react";
import Logout from "../LogOut/Logout";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import "./solar.css";

const getSolarInformations = async (cityName, date) => {
    const token = localStorage.getItem('jwtToken');
    const response = await fetch(`/api/user/solar?city=${cityName}&date=${date}`, {
        method: "GET",
        headers: { "Authorization": `Bearer ${token}`, },
    });
    if (response.ok) {
        const data = await response.json()
        return data;
    } else {
        throw new Error('Failed to fetch protected resource');
    }
}

const getCities = async () => {
    const token = localStorage.getItem('jwtToken');
    console.log(token)
    const res = await fetch("/api/user/cities", {
        method: "GET",
        headers: { "Authorization": `Bearer ${token}`, },
    });
    if (res.ok) {
        const data = await res.json()
        return data;
    } else {
        throw new Error('Failed to fetch cities');
    }
}

const getDates = async (cityName) => {
    const token = localStorage.getItem('jwtToken');
    const res = await fetch(`/api/user/dates?city=${cityName}`, {
        method: "GET",
        headers: { "Authorization": `Bearer ${token}`, },
    });
    if (res.ok) {
        const data = await res.json()
        return data;
    } else {
        throw new Error('Failed to fetch dates for city');
    }
}


function SolarWatch() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [cityHolder, setCityHolder] = useState("");
    const [dateHolder, setDateHolder] = useState(new Date());
    const [city, setCity] = useState("");
    const [date, setDate] = useState("");
    const [sunrise, setSunrise] = useState("");
    const [sunset, setSunset] = useState("");
    const [cities, setCities] = useState(null);
    const [dates, setDates] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);

    useEffect(() => {
        const fetchCities = async () => {
            try {
                const data = await getCities();
                setCities(data.cities);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }
        fetchCities();
    }, [])

    const handleDates = (city) => {
        const fetchDates = async () => {
            try {
                const data = await getDates(city);
                setDates(data.dates);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }
        fetchDates();
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const fetchSolarInformations = async () => {
            try {
                const data = await getSolarInformations(cityHolder, dateHolder);
                setSunrise(data.sunrise);
                setCity(data.city)
                setDate(data.date);
                setSunset(data.sunset);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }
        fetchSolarInformations();
        setIsSubmitted(true);
    }


    const filterDate = (date) => {
        return dates && dates.some(d => new Date(d).toDateString() === date.toDateString());
    }



    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="mainpageBackground">
            <nav>
                <Logout />
            </nav>
            <div className="search">
                <form onSubmit={handleSubmit}>
                    <select onChange={(e) => {
                        setCityHolder(e.target.value)
                        handleDates(e.target.value)
                    }} className="selectCity">
                        <option value="firstOption">Please choose a city</option>
                        {cities && cities.map(city => (
                            <option value={city}
                                key={city}
                            >{city}</option>
                        ))}
                    </select>
                    <p></p>
                    <DatePicker
                        className="datePicker"
                        selected={dateHolder}
                        onChange={date => setDateHolder(date.toISOString().split('T')[0])}
                        filterDate={filterDate}
                        placeholderText="Select a day"
                    />
                    <p></p>
                    <button type="submit" className="searchButton">Search</button>
                </form>
            </div>
            {isSubmitted ? (
                <div className="result">
                    <h2 className="city"><i>{city} on </i></h2>
                    <h2 className="date"><i> {date}</i></h2>
                    <h2 className="sunrise">Sunrise: {sunrise}</h2>
                    <h2 className="sunset">Sunset: {sunset}</h2>
                </div>) : <p></p>}
        </div>
    )

}

export default SolarWatch;