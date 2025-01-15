

const Card = ({ title, description }) => {
    return (
      <div className="bg-white shadow-lg rounded-xl p-6 transition-transform transform hover:scale-105 hover:shadow-2xl">
        <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
        <p className="text-sm text-gray-700 mt-4 leading-relaxed">{description}</p>
      </div>
    );
  };

export default Card;