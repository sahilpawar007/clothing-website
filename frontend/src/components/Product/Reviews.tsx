import React from "react";

interface Review {
  name: string;
  date: Date;
  rating: number;
  comment: string;
}

const sampleReviews: Review[] = [
  {
    name: "John Doe",
    date: new Date(2023, 3, 15),
    rating: 5,
    comment: "Great product! Totally loved it.",
  },
  {
    name: "John Doe",
    date: new Date(2023, 3, 15),
    rating: 5,
    comment: "Great product! Totally loved it.",
  },
  {
    name: "John Doe",
    date: new Date(2023, 3, 15),
    rating: 5,
    comment: "Great product! Totally loved it.",
  },
  {
    name: "John Doe",
    date: new Date(2023, 3, 15),
    rating: 5,
    comment: "Great product! Totally loved it.",
  },
  {
    name: "John Doe",
    date: new Date(2023, 3, 15),
    rating: 5,
    comment: "Great product! Totally loved it.",
  },
  // ... You can add more sample reviews in a similar format.
];

const Reviews: React.FC = () => {

  return (
    <>
      <div
        id="reviews"
        className="mx-48 space-y-4 z-50 bg-white drop-shadow-lg rounded-lg my-20 p-20 "
      >
        <div className="flex justify-between">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Customer Reviews
          </h2>

        </div>


        {sampleReviews.map((review, idx) => (
          <div key={idx} className="p-4 border rounded-md">
            <div className="font-bold">{review.name}</div>
            <div className="text-sm text-gray-500">
              {review.date.toLocaleDateString()}
            </div>
            <div className="flex space-x-1">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className={
                    i < review.rating ? "text-yellow-500" : "text-gray-300"
                  }
                >
                  ★
                </span>
              ))}
            </div>
            <p>{review.comment}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Reviews;
