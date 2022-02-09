import React from "react";
import ListingCard from "./ListingCard";

function ListingsContainer({listings, deleteListing}) {
  return (
    <main>
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
