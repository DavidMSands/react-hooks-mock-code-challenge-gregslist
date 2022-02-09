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

  useEffect(() => {
    fetch(listing_url)
    .then(res => res.json())
    .then(data => {
      setListings(data)
      setFilterListing(data)
    })
  }, [])

  function handleClick() {
    setChecked(checked => !checked)
  }

  function deleteListing(id) {
    const updatedListing = filterListing.filter(listing => listing.id !== id)
    setFilterListing(updatedListing)
    fetch(listing_url + `/${id}`, {
      method: 'DELETE',
    })
    .then(res => res.json())
    .then(data => console.log(data))
  }

  useEffect(() => {
    let sortedArray = []
    if(checked) {
      function compare(a, b) {
        if(a.location < b.location){
        return -1
        }
        if(a.location > b.location) {
        return 1
        }
        return 0
      }
      sortedArray = [...filterListing].sort(compare)
    } else {
      sortedArray = listings
    }
    setFilterListing(sortedArray)
  }, [checked])

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
      <Header search={search} setSearch={setSearch} setFilterListing={setFilterListing} listings={listings} />
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
