
const Description = () => {
    return (
        <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
            {/* <!-- Description and details --> */}
            <div>
                <h3 className="sr-only">Description</h3>

                <div className="space-y-6">
                    <p className="text-base text-gray-900">
                        The Basic Tee 6-Pack allows you to fully express your vibrant
                        personality with three grayscale options. Feeling adventurous?
                        Put on a heather gray tee. Want to be a trendsetter? Try our
                        exclusive colorway: &quot;Black&quot;. Need to add an extra
                        pop of color to your outfit? Our white tee has you covered.
                    </p>
                </div>
            </div>

            <div className="mt-10">
                <h3 className="text-sm font-medium text-gray-900">Highlights</h3>

                <div className="mt-4">
                    <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                        <li className="text-gray-400">
                            <span className="text-gray-600">
                                Hand cut and sewn locally
                            </span>
                        </li>
                        <li className="text-gray-400">
                            <span className="text-gray-600">
                                Dyed with our proprietary colors
                            </span>
                        </li>
                        <li className="text-gray-400">
                            <span className="text-gray-600">
                                Pre-washed &amp; pre-shrunk
                            </span>
                        </li>
                        <li className="text-gray-400">
                            <span className="text-gray-600">
                                Ultra-soft 100% cotton
                            </span>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="mt-10">
                <h2 className="text-sm font-medium text-gray-900">Details</h2>

                <div className="mt-4 space-y-6">
                    <p className="text-sm text-gray-600">
                        The 6-Pack includes two black, two white, and two heather gray
                        Basic Tees. Sign up for our subscription service and be the
                        first to get new, exciting colors, like our upcoming
                        &quot;Charcoal Gray&quot; limited release.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Description