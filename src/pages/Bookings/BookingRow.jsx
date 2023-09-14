
const BookingRow = ({ booking, handleDeleteService, handleBookingConfirm}) => {
  
    const {_id, date, price, img, service, status } = booking;

    return (
        <tr>
            <td>
                <button className="btn btn-square" onClick={()=>{handleDeleteService(_id)}}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
            </td>
            <td>

                <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                        {img && <img src={img} alt="Avatar Tailwind CSS Component" />}
                    </div>
                </div>

            </td>
            <td>{service}</td>
            <td>{date}</td>
            <td>{price}</td>
            <td>
               {status === "confirm" ? <span className="font-bold text-primary">approved</span>: <button className="btn btn-ghost btn-xs" onClick={()=>handleBookingConfirm(_id)}>Confirm</button>}
            </td>
        </tr>
    );
};




export default BookingRow;