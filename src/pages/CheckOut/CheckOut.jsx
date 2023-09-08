import { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../Providers/AuthProviders';

const CheckOut = () => {
    const service = useLoaderData();
    const { title, _id, price, img } = service;

    const {user} = useContext(AuthContext)

    const handleBookService = event =>{
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const date = form.date.value;
        const price = form.price.value;

        const booking = {
            customerName: name,
            email,
            date,
            price,
            service_id: _id,
            service: title,
            img,
        }
        fetch('http://localhost:5000/bookings', {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(booking)
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data)
            if(data.insertedId){
                alert("service book successfully")
                form.reset()
            }
        })
    }
    return (
        <div>
            <h2>Book Services</h2>
            <form onSubmit={handleBookService}>
                <div className="card-body">
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" name="name" defaultValue={user?.displayName} className="input input-bordered" />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Date</span>
                            </label>
                            <input type="Date" name="date" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name="email" defaultValue={user?.email} className="input input-bordered" />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Due Amount</span>
                            </label>
                            <input type="text" name="price" defaultValue={'$' + price} className="input input-bordered" />
                        </div>
                    </div>

                    <div className="form-control mt-6">
                        <button className="btn btn-primary btn-block">Order Confirm</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default CheckOut;