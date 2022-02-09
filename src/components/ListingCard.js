import React, {useState} from "react";

function ListingCard({ name, description, image, location, id, deleteListing }) {
  const [isFavorite, setIsFavorite] = useState(false)

  function handleFavoriteClick () {
    setIsFavorite(isFavorite => !isFavorite)
  }

  return (
    <li className="card">
      <div className="image">
        <span className="price">$0</span>
        <img src={image} alt={description} />
      </div>
      <div className="details">
        {isFavorite ? 
          <button className="emoji-button favorite active" onClick={handleFavoriteClick}>★</button>
         : 
          <button className="emoji-button favorite" onClick={handleFavoriteClick}>☆</button>
        }
        <strong>{description}</strong>
        <span> · {location}</span>
        <button className="emoji-button delete" onClick={() => deleteListing(id)}>🗑</button>
      </div>
    </li>
  );
}

export default ListingCard;
