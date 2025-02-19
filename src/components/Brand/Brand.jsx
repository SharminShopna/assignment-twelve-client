import React from 'react';
import Marquee from 'react-fast-marquee';
import b1 from '../../assets/1.png';
import b2 from '../../assets/2.png';
import b3 from '../../assets/3.png';
import b4 from '../../assets/4.png';
import b5 from '../../assets/5.png';
import b6 from '../../assets/6.png';
import b7 from '../../assets/7.png';
import b8 from '../../assets/8.png';
import b9 from '../../assets/9.png';
import SectionTitle from '../SectionTitle';
const Brand = () => {
    return (
        <section className="py-12 text-center my-6">
            <SectionTitle
                heading="Trusted by Leading Real Estate Brands"
                subHeading="Top real estate companies rely on us"
            />
            <div className="mt-4 border-t border-white w-4/5 mx-auto"></div>
            <Marquee speed={80} className="mt-6">
                <img src={b1} alt="Keller Williams" className="h-16 w-full mx-8" />
                <img src={b2} alt="Coldwell Banker" className="h-16 mx-8" />
                <img src={b3} alt="ERA Real Estate" className="h-16 mx-8" />
                <img src={b4} alt="EXP Global" className="h-16 mx-8" />
                <img src={b5} alt="Century 21" className="h-16 mx-8" />
                <img src={b6} alt="RE/MAX" className="h-16 mx-8" />
                <img src={b7} alt="Sotheby's Realty" className="h-16 mx-8" />
                <img src={b8} alt="Compass" className="h-16 mx-8" />
                <img src={b9} alt="Berkshire Hathaway HomeServices" className="h-16 mx-8" />
            </Marquee>
        </section>
    );
};

export default Brand;