import React from "react";
import Search from "./Search";

function Header({ search, setSearch, listings, setFilterListing }) {
  return (
    <header>
      <h1>
        <span className="logo" role="img">
          ☮
        </span>
        gregslist
      </h1>
      <Search search={search} setSearch={setSearch} listings={listings} setFilterListing={setFilterListing} />
    </header>
  );
}

export default Header;
