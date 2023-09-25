import Row from "./Row";
import TData from "./td";
import THead from "./th";

const Body = () => {
  return (
    <tbody>
      <Row>
        <THead th="Microsoft Surface Pro" />
        <TData td="Data" />
        <TData td="Data" />

        <td className="px-6 py-4 flex justify-start">
          <a
            href="#"
            className="pr-5 font-medium text-blue-600 dark:text-blue-500 hover:underline"
          >
            Edit
          </a>
          <a
            href="/order-details"
            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
          >
            View Details
          </a>
        </td>
      </Row>

      <Row>
        <THead th="Microsoft Surface Pro" />
        <TData td="Data" />
        <TData td="Data" />

        <td className="px-6 py-4 flex justify-start">
          <a
            href="#"
            className="pr-5 font-medium text-blue-600 dark:text-blue-500 hover:underline"
          >
            Edit
          </a>
          <a
            href="/order-details"
            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
          >
            View Details
          </a>
        </td>
      </Row>
    </tbody>
  );
};

export default Body;
