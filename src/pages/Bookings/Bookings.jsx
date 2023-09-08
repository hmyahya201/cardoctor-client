import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Providers/AuthProviders";

const Bookings = () => {
    const [bookings, setBookings] = useState([])
    const {user} = useContext(AuthContext);
    const url = `http://localhost:5000/bookings?email=${user?.email}`;
    useEffect(()=>{
        fetch(url)
        .then(res=>res.json())
        .then(data=>{
            setBookings(data)
        })
    }, [url])
    return (
        <div>
            <h1>Bookings</h1>
            <h1>Booking {bookings.length}</h1>
        </div>
    );
};

export default Bookings;