import React, {useEffect, useState} from "react";
import Header from "./Header";
import ListingsContainer from "./ListingsContainer";

function App() {
  const [listings, setListings] = useState([])
  const [filterListing, setFilterListing] = useState([])
  const [search, setSearch] = useState('')
  const listing_url = 'http://localhost:6001/listings'

  useEffect(() => {
    fetch(listing_url)
    .then(res => res.json())
    .then(data => {
      setListings(data)
      setFilterListing(data)
    })
  }, [])

  function deleteListing(id) {
    const updatedListing = filterListing.filter(listing => listing.id !== id)
    setFilterListing(updatedListing)
    fetch(listing_url + `/${id}`, {
      method: 'DELETE',
    })
    .then(res => res.json())
    .then(data => console.log(data))
  }

  return (
    <div className="app">
      <Header search={search} setSearch={setSearch} setFilterListing={setFilterListing} listings={listings} />
      <ListingsContainer listings={filterListing} deleteListing={deleteListing} />
    </div>
  );
}

export default App;
