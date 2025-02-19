import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import SectionTitle from './SectionTitle';
import Loading from './Loading';

const LatestReviews = () => {
    const { data: reviews, isLoading, error } = useQuery({
        queryKey: ['latestReviews'],
        queryFn: async () => {
            const { data } = await axios.get('https://assignment-twelve-server-drab.vercel.app/latest-reviews');
            // console.log(data);
            return data;
        },
    });

    // Loading state
    if (isLoading) return <div><Loading></Loading></div>;

    if (error) return <div>Error fetching reviews: {error.message}</div>;

    return (
        <div className='my-32'>
            <div className='mt-12 mb-20'>
            <SectionTitle
                heading="Latest User Reviews"
                subHeading="Read what our users are saying about their experience with the properties"
            ></SectionTitle>
            </div>
            <div className="grid lg:grid-cols-4 gap-4">
                {reviews?.map((review, index) => (
                    <div key={index} className=" p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                        <div className="flex items-center mb-3">
                            <img
                                src={review.image}
                                alt={review.name}
                                className=" rounded-full"
                                width={32}
                                height={32}
                            />
                            <h2 className="ml-4 text-lg font-semibold">{review.userName}</h2>
                        </div>
                        <p className="text-sm mb-3">Review: {review.reviewText}</p>
                        <h3 className="font-medium text-md">Property: {review?.title?.title}</h3>
                        <p className="text-sm mt-2 flex items-center">Rating: {review.rating}<div className="rating">
                            <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                            <input
                                type="radio"
                                name="rating-2"
                                className="mask mask-star-2 bg-orange-400"
                                defaultChecked />
                            <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                            <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                            <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                        </div></p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LatestReviews;
