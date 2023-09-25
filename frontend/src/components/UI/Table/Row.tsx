interface Option {
  children: React.ReactNode;
}

const Row: React.FC<Option> = ({ children }) => {
  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
      <td className="w-4 p-4">
        <div className="flex items-center"></div>
      </td>
      {children}
    </tr>
  );
};

export default Row;
