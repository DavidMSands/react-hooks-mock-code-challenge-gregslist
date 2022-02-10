import React, {useEffect, useState} from "react";
import Header from "./Header";
import ListingsContainer from "./ListingsContainer";

function App() {
  const [listings, setListings] = useState([])
  const [filterListing, setFilterListing] = useState([])
  const [search, setSearch] = useState('')
  const [checked, setChecked] = useState(false)
  const [newDescription, setNewDescription] = useState('')
  const [newImage, setNewImage] = useState('')
  const [newLocation, setNewLocation] = useState('')
  const listing_url = 'http://localhost:6001/listings'

//initial fetch
  useEffect(() => {
    fetch(listing_url)
    .then(res => res.json())
    .then(data => {
      setListings(data)
      setFilterListing(data)
    })
  }, [])


//search submit event handler
  function handleSubmit(e) {
    e.preventDefault();
    const displayListings = listings.filter(listing => listing.description.toLowerCase().includes(search.toLowerCase()))
    setFilterListing(displayListings)
  }

//sort event handler
  function handleClick() {
    setChecked(checked => !checked)
  }

//delete listing event listener
  function deleteListing(id) {
    const updatedListing = filterListing.filter(listing => listing.id !== id)
    setFilterListing(updatedListing)
    fetch(listing_url + `/${id}`, {
      method: 'DELETE',
    })
    .then(res => res.json())
    .then(data => console.log(data))
  }

//sorts the listings when checkbox is checked
  useEffect(() => {
    let sortedArray = []
    if(checked) {
      function compare(a, b) {
        if(a.location < b.location)
        return -1
        if(a.location > b.location) 
        return 1
        return 0
      }
      sortedArray = [...filterListing].sort(compare)
      setFilterListing(sortedArray)
    } else {
      const displayListings = listings.filter(listing => listing.description.includes(search))
      setFilterListing(displayListings)
    }
  }, [checked])

//new listing form submit handler
  function handleFormSubmit(e) {
    e.preventDefault()
    const newObj = {
      description: newDescription,
      image: newImage,
      location: newLocation
    }
    const updatedListings = [...filterListing, newObj]
    setFilterListing(updatedListings)
    fetch(listing_url, {
      method: 'POST', 
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newObj)
      })
      .then(res => res.json())
      .then(data => {
        console.log(data)
      })
  }

  return (
    <div className="app">
      <Header 
      search={search} 
      setSearch={setSearch} 
      handleSubmit={handleSubmit} 
      setFilterListing={setFilterListing} 
      listings={listings} />

      <ListingsContainer 
      listings={filterListing} 
      deleteListing={deleteListing} 
      checked={checked} 
      handleClick={handleClick}
      newDescription={newDescription}
      newImage={newImage}
      newLocation={newLocation}
      setNewDescription={setNewDescription}
      setNewImage={setNewImage}
      setNewLocation={setNewLocation} 
      handleFormSubmit={handleFormSubmit}
      />
    </div>
  );
}

export default App;
