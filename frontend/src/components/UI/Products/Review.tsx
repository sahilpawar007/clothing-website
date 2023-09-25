import { Rating } from "@material-tailwind/react"

interface ReviewProps {
    onClick: () => void
}

const Review: React.FC<ReviewProps> = ({ onClick }) => {
    return (
        <div className="mt-6">
            <h3 className="sr-only">Reviews</h3>
            <div className="flex items-center space-x-4">
                <div className="flex items-center ">
                    {/* <!-- Active: "text-gray-900", Default: "text-gray-200" --> */}
                    <Rating value={4} readonly />
                </div>
                <p className="sr-only">4 out of 5 stars</p>
                <a
                    href="#reviews"
                    className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500"
                >
                    117 reviews
                </a>
                <button className="flex justify-center rounded-md border-2 border-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-indigo-600 shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={onClick} title="reviwcard">Rate this Product</button>

            </div>
        </div>
    )
}

export default Review