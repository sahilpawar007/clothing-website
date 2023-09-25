// import React from 'react'

import Button from "../User/UI/Button";
import Form from "../User/UI/Form";
import { Rating } from "@material-tailwind/react";

interface ReviewCardProps {
    closeReviewCard: () => void;
    isVisible: boolean;
}

const CreateReview: React.FC<ReviewCardProps> = ({ closeReviewCard, isVisible }) => {
    return (
        <>
            <div
                className={`top-20 sticky z-50 cart-transition ${isVisible
                    ? "opacity-100 pointer-events-auto"
                    : "opacity-0 pointer-events-none"
                    }`}
                aria-labelledby="slide-over-title"
                role="dialog"
                aria-modal="true"
            >
                <div className="fixed inset-0  bg-gray-500 bg-opacity-75 transition-opacity overflow-hidden"></div>
                <div className="bg-white relative z-50 w-1/2 mx-auto shadow-lg rounded-lg my-10">
                    <Form title="Review">
                        {
                            <>
                                <div className="flex flex-col gap-4 text-blue-500">
                                    <Rating />
                                </div>
                                <textarea
                                    title="form"
                                    id="reviwform"
                                    name="review"

                                    className="border-2 border-black w-full h-full max-h-40"
                                />
                                <div className="flex space-x-4 ">
                                    <Button buttonName="Create Review" />
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            closeReviewCard();
                                        }}
                                        className="flex  justify-center rounded-md bg-gray-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </>
                        }
                    </Form>
                </div>
            </div>
        </>
    );
};

export default CreateReview;
