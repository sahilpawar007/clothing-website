interface TextProps {
    text: string;
    className?: string
}
const Text: React.FC<TextProps> = ({ text, className }) => {
    return (
        <>
            {" "}
            <p className={`text-sm font-medium text-gray-500 ${className} `} >{text}</p>
        </>
    );
};

export default Text;
