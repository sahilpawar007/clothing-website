const Search = () => {
  return (
    <div className="relative mr-3 md:mr-0 hidden md:block">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <svg
          className="w-5 h-5 text-gray-900"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
            clipRule="evenodd"
          ></path>
        </svg>
      </div>
      <input
        type="text"
        id="email-adress-icon"
        className="bg-gray-50 border-2 border-gray-400 text-gray-900 focus:outline-none sm:text-sm rounded-lg block w-full pl-10 py-2 px-60 mt-1"
        placeholder="Search"
      />
    </div>
  );
};

export default Search;
