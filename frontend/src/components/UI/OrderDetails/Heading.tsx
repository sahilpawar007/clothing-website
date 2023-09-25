interface HeadingProps {
    heading: string;
}
const Heading: React.FC<HeadingProps> = ({ heading }) => {
    return (
        <><h2 className="text-2xl font-bold tracking-tight text-gray-900">
            {heading}
        </h2></>
    )
}

export default Heading