import { useEffect, useState } from "react";
import ServicesCard from "./ServicesCard";

const Services = () => {
    const [services, setServices] = useState([])

    useEffect(()=>{
        fetch('http://localhost:5000/services')
        .then(res=>res.json())
        .then(data=>setServices(data))
    },[])
    return (
        <div className="mt-5">
            <div className="text-center">
                <h3 className="text-3xl text-orange-500 font-bold">Services</h3>
                <h2 className="text-5xl pb-3">Our Services Area</h2>
                <p>the majority have suffered alteration in some form, by injected humour, or randomised <br/> words which do not look even slightly believable. </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center gap-5">
                {services.map(service=><ServicesCard
                key={Services._id}
                service= {service}
                ></ServicesCard>)}
            </div>

            <div className="grid place-items-center mt-8">
                <button className="btn btn-outline btn-error">More Services</button>
            </div>
        </div>
    );
};

export default Services;