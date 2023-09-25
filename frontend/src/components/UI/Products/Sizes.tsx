
interface SizesProps {
    value: string
    ariaLabelledby?: string
    children?: React.ReactNode
    disable?: "cursor-not-allowed bg-gray-50 text-gray-200"
    enable?: "cursor-pointer bg-white text-gray-900 shadow-sm"
}

const Sizes: React.FC<SizesProps> = ({ value, ariaLabelledby, children, disable, enable }) => {
    return (
        <label className={`group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6  ${disable} ${enable}`}>
            <input
                type="radio"
                name="size-choice"
                value={value}
                className="sr-only"
                aria-labelledby={ariaLabelledby}
            />
            <span id="size-choice-1-label">{value}</span>

            {children}
        </label>
    )
}

export default Sizes