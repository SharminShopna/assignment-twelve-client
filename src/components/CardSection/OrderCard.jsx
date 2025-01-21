import { CiLocationOn } from "react-icons/ci";


const OrderCard = ({ orderData }) => {
    const { image, title, location, agentName, price, quantity, _id, status } = orderData

    return (
        <div>
            <div

                className="border rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-200"
            >
                <img
                    src={image}
                    alt={title}
                    className="w-full h-48 object-cover"
                />
                <div className="p-4">
                    <h3 className="text-lg font-semibold">{title}</h3>
                    <p className="text-gray-600 flex items-center gap-1"><CiLocationOn /> {location}</p>
                    <p className="text-gray-800 mt-2">
                        <strong>Agent:</strong> {agentName}
                    </p>
                    <p className="text-gray-800">
                        <strong>Offered Amount:</strong> ${price}
                    </p>
                    <p className="text-gray-800">
                        <strong>Quantity:</strong> {quantity}
                    </p>
                    <div
                        className={`mt-2 text-center font-semibold py-1 rounded ${status === 'pending'
                            ? 'bg-yellow-500 text-white'
                            : status === 'approved'
                                ? 'text-white bg-green-800'
                                : 'bg-lime-700 text-white'
                            }`}
                    >
                        {status}
                    </div>

                    <div className="flex gap-4 mt-1">
                        {status === "approved" && (
                            <button
                                onClick={() => handlePayment(_id)}
                                className="mt-4 w-full bg-lime-700 text-white py-2 px-4 rounded hover:bg-lime-900 transition duration-200"
                            >
                                Pay
                            </button>
                        )}
                        <button className="btn bg-red-700 text-white">Cancel</button>

                    </div>
                    {/* <button
                        className='relative disabled:cursor-not-allowed cursor-pointer inline-block px-3 py-1 font-semibold text-lime-900 leading-tight'
                    >
                        <span className='absolute cursor-pointer inset-0 bg-red-200 opacity-50 rounded-full'></span>
                        <span className='relative cursor-pointer'>Cancel</span>
                    </button>  */}
                </div>
            </div>
        </div>
    );
};

export default OrderCard;