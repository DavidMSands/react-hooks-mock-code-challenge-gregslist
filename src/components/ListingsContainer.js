import React from "react";
import { useState } from "react/cjs/react.development";
import ListingCard from "./ListingCard";

function ListingsContainer({ 
  listings, 
  handleFormSubmit, 
  deleteListing, 
  checked, 
  handleClick, 
  newDescription,
  newLocation, 
  newImage, 
  setNewDescription, 
  setNewLocation, 
  setNewImage 
}) {
  const [showAddListing, setShowAddListing] = useState(false)

  function handleShowForm() {
    setShowAddListing(showAddListing => !showAddListing)
  }
  return (
    <main>
      {showAddListing 
      ? <form onSubmit={handleFormSubmit}>
        <input type="text" name="description" placeholder="Description" value={newDescription} onChange={(e) => setNewDescription(e.target.value)} />
        <input type="text" name="image" placeholder="Image URL" value={newImage} onChange={(e) => setNewImage(e.target.value)} />
        <input type="text" name="listing" placeholder="Location" value={newLocation} onChange={(e) => setNewLocation(e.target.value)} />
        <button type="submit" >Add listing</button>
      </form>
      : null
         }
      <div>
        <input type="checkbox" id="sort-location" name="scales" checked={checked} onClick={handleClick} />
        <label for="sort-location">Sort by location</label>
      </div>
      <button onClick={handleShowForm}>Add New Listing</button>
      <ul className="cards">
        {listings.map(listing => (
          <ListingCard 
          key={listing.id} 
          description={listing.description} 
          image={listing.image} 
          location={listing.location}
          id={listing.id} 
          deleteListing={deleteListing}
          /> 
        ))}
      </ul>
    </main>
  );
}

export default ListingsContainer;
