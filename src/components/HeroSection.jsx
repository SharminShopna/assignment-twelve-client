
import bgImage from '../assets/hd.png';
const HeroSection = () => {
  return (
    <section
    className="relative bg-cover bg-center h-[600px] flex flex-col justify-center items-center my-12"
    style={{ backgroundImage: `url(${bgImage})` }}
  >
      <div className="absolute inset-0 bg-gradient-to-b from-black to-transparent opacity-75"></div>
      <div className="z-10 max-w-4xl text-center px-4 sm:px-8">
        <h1 className="text-5xl sm:text-7xl font-extrabold text-white leading-snug">
          Discover Your Dream Property
        </h1>
        <p className="mt-6 text-lg sm:text-2xl text-gray-50">
          A platform that brings you the finest real estate properties with the convenience of a few clicks. 
          Browse, explore, and immerse yourself in the possibilities of finding your perfect home or investment.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <div className="text-left max-w-lg text-gray-50">
            <p className="mb-4">
              🌟 <span className="font-medium">Wide Range of Properties:</span> Explore listings from top locations worldwide.
            </p>
            <p className="mb-4">
              🛠️ <span className="font-medium">Seamless Navigation:</span> Effortlessly search and filter for your needs.
            </p>
            <p className="mb-4">
              🌍 <span className="font-medium">Global Reach:</span> Real estate opportunities from trusted agents globally.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
