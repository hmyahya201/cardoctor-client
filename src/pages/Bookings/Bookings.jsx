import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Providers/AuthProviders";
import BookingRow from "./BookingRow";

const Bookings = () => {
    const [bookings, setBookings] = useState([])
    const { user } = useContext(AuthContext);

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
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setBookings(data)
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