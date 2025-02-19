
import features from "../../../public/features.json";
import SectionTitle from "../SectionTitle";

const FeatureSection = () => {
    return (
        <section className="py-12 bg-lime-50">
            <div className="max-w-6xl mx-auto px-6 text-center">
                <SectionTitle
                    heading="REP FEATURES"
                    subHeading="Explore the powerful tools available for real estate professionals."
                />


                {features.map((section, sectionIndex) => (
                    <div key={sectionIndex} className="mt-10">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
                            {section.items.map((feature, index) => (
                                <div key={index} className="bg-white p-6 shadow-md rounded-lg border border-lime-700">
                                    <h4 className="text-xl font-semibold text-lime-700">{feature.title}</h4>
                                    <p className="text-gray-600 mt-2">{feature.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default FeatureSection;