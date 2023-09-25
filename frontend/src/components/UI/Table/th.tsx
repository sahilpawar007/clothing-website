interface Option {
  th: string;
}

const THead: React.FC<Option> = ({ th }) => {
  return (
    <th
      scope="row"
      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
    >
      {th}
    </th>
  );
};

export default THead;
