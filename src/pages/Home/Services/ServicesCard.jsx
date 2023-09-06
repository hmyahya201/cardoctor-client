
const ServicesCard = ({service}) => {
    const {title, img, price} = service
    return (
        <div className="card w-96 bg-base-100 shadow-xl">
        <figure className="px-10 pt-10">
            <img src={img} alt="Shoes" className="rounded-xl" />
        </figure>
        <div className="card-body items-start">
            <h2 className="card-title">{title}</h2>
            <p className="text-xl text-orange-600">Price: {price}</p>
        </div>
        </div>
    );
};

export default ServicesCard;