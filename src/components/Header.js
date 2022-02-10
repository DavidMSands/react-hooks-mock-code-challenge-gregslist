import React from "react";
import Search from "./Search";

function Header({ search, setSearch, listings, setFilterListing, checked, handleSubmit }) {
  return (
    <header>
      <h1>
        <span className="logo" role="img">
          ☮
        </span>
        gregslist
      </h1>
      <Search 
      search={search} 
      handleSubmit={handleSubmit} 
      setSearch={setSearch} 
      checked={checked} 
      />
    </header>
  );
}

export default Header;
