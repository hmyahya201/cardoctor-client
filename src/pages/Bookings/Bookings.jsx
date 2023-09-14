import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Providers/AuthProviders";
import BookingRow from "./BookingRow";
import { useNavigate } from "react-router-dom";

const Bookings = () => {
    const [bookings, setBookings] = useState([])
    const { user } = useContext(AuthContext);
    const navigate = useNavigate()

    const handleDeleteService = (id)=>{
        const proceed = confirm("Are sure, you want to delete your service");
        if(proceed){
            fetch(`http://localhost:5000/bookings/${id}`, {
                method: "DELETE"
            })
            .then(res=>res.json())
            .then(data=>{
                if(data.deletedCount> 0){
                    alert("Deleted successfully")
                    const remaining = bookings.filter(booking=>booking._id !== id)
                    setBookings(remaining)
                }
            })
        }
    }

    const handleBookingConfirm = (id)=>{
        fetch(`http://localhost:5000/bookings/${id}`, {
            method: "PATCH",
            headers:{
                "content-type": "application/json"
            },
            body: JSON.stringify({status: "confirm"})

        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data)
            if(data.modifiedCount>0){
                const remaining = bookings.filter(booking=>booking._id !== id)
                const updated = bookings.find(booking=>booking._id == id)
                updated.status = "confirm"
                const newBooking = [updated, ...remaining]
                setBookings(newBooking)
            }
        })
    }

    const url = `http://localhost:5000/bookings?email=${user?.email}`;
    useEffect(() => {
        fetch(url, {
            method: "GET",
            headers: {
                authorization : `Bearar ${localStorage.getItem("car-access-token")}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if(!data.error){
                    setBookings(data)
                } 
                else{
                    //logOut and then navigate
                    navigate('/')
                }
            })
    }, [url])
    return (
        <div className="overflow-x-auto">
            <table className="table">
                {/* head */}
                <thead>
                    <tr>
                        <th>
                            
                        </th>
                        <th>Image</th>
                        <th>Service</th>
                        <th>Date</th>
                        <th>Price</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {/* row 1 */}
                    {bookings.map(booking => <BookingRow
                        key={booking._id}
                        booking={booking}
                        handleDeleteService ={handleDeleteService }
                        handleBookingConfirm ={handleBookingConfirm}
                    ></BookingRow>)}
                </tbody>

            </table>
        </div>
    );
};

export default Bookings;