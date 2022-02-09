import React from "react";

function Search({search, setSearch, listings, setFilterListing }) {
  function handleSubmit(e) {
    e.preventDefault();
    const updatedListing = listings.filter(listing => listing.description.includes(search))
    setFilterListing(updatedListing)
  }
  
  return (
    <form className="searchbar" onSubmit={handleSubmit}>
      <input
        type="text"
        id="search"
        placeholder="search free stuff"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button type="submit">🔍</button>
    </form>
  );
}

export default Search;
