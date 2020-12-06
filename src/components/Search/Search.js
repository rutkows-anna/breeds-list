const Search = ({ searchValue, onSearchChange }) => {
  const handleOnChange = (event) => {
    onSearchChange(event.target.value);
  };

  return (
    <input
      className="search"
      type="text"
      placeholder="Search for breeds..."
      value={searchValue}
      onChange={handleOnChange} />
  );
};

export default Search;
