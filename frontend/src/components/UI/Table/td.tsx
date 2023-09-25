interface Option {
  td: string;
}

const TData: React.FC<Option> = ({ td }) => {
  return <td className="px-6 py-4">{td}</td>;
};

export default TData;
