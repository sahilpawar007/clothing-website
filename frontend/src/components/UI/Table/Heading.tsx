const Heading = () => {
  return (
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" className="p-4">
          <div className="flex items-center"></div>
        </th>
        <th scope="col" className="px-6 py-3">
          Order ID
        </th>
        <th scope="col" className="px-6 py-3">
          No. of items
        </th>
        <th scope="col" className="px-6 py-3">
          Price
        </th>
        <th scope="col" className="px-6 py-3">
          Action
        </th>
      </tr>
    </thead>
  );
};

export default Heading;
