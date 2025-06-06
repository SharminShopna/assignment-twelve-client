

const SectionTitle = ({heading, subHeading}) => {
    return (
        <div className="mx-auto text-center md:w-4/12 my-8">
            <p className="text-lime-700 italic mb-2">--- {subHeading} ---</p>
            <h3 className="text-3xl text-gray-900 dark:text-gray-600 italic uppercase border-y-4 py-4">{heading}</h3>
        </div>
    );
};

export default SectionTitle;