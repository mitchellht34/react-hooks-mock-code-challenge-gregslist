import React, { useEffect, useState } from "react";
import ListingCard from "./ListingCard";

function ListingsContainer({ searchInput }) {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    fetch("http://localhost:6001/listings")
      .then((resp) => resp.json())
      .then((data) => {
        setListings(data);
        console.log(data);
      })
  }, [])

  const filteredSearchProducts = listings.filter((listing) => {
    return listing.description
      .toLowerCase()
      .includes(searchInput.toLowerCase());
  });

  function handleDeleteCard(id){
    fetch(`http://localhost:6001/listings/${id}`, {
      method: "DELETE",
    })
      .then((r) => r.json())
      .then(() => {
        const updatedListings = listings.filter((listing) => listing.id !== id);
        setListings(updatedListings);
      })
  }

  const listingsToDisplay = filteredSearchProducts.map((listing) => (
    <ListingCard key={listing.description} listing={listing} onDelete={handleDeleteCard} />
  ))

  return (
    <main>
      <ul className="cards">
        {listingsToDisplay}
      </ul>
    </main>
  );
}

export default ListingsContainer;
