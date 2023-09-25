import Body from "./Body";
import Heading from "./Heading";

const Table = () => {
  return (
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <Heading />
      <Body />
    </table>
  );
};

export default Table;
