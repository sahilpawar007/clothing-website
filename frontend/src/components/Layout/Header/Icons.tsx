import { MouseEventHandler } from "react";

interface IconType {
  title: string;
  span: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  strokeLinecap: "butt" | "round" | "square" | "inherit" | undefined;
  strokeLinejoin: "round" | "inherit" | "miter" | "bevel" | undefined;
  d: string;
}

const Icons: React.FC<IconType> = ({
  span,
  title,
  onClick,
  strokeLinecap,
  strokeLinejoin,
  d,
}) => {
  return (
    <button
      className="text-gray-900 border-transparent border-2 hover:border-2 hover:border-gray-500 hover:text-gray-700 rounded-md px-3 py-2 text-xl font-medium"
      title={title}
      onClick={onClick}
    >
      {span ? (
        <span className="relative left-5 flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
        </span>
      ) : null}

      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap={strokeLinecap}
          strokeLinejoin={strokeLinejoin}
          d={d}
        />
      </svg>
    </button>
  );
};

export default Icons;
