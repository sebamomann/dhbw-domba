import React, { useState, useEffect } from "react";
import { createRating, fetchAllBusinesses, fetchRatingsByBusinessId, isLoggedIn } from "./../services/businessService";
import { Page, Navbar, List, ListItem, Link, Button, f7, AccordionContent, Block } from "framework7-react";
import RatingForm from "./ratingForm";
import RatingsDisplay from "./ratingsDisplay";
import BusinessItem from "./BusinessItem";

const BusinessList = ({ loggedIn }) => {
  const [businesses, setBusinesses] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [showRatingForm, setShowRatingForm] = useState(false);
  const [selectedBusinessId, setSelectedBusinessId] = useState(null);

  const closeRatingForm = () => {
    setSelectedBusinessId(null);
    setShowRatingForm(false);
    f7.popup.close();
  };

  const submitRating = (rating, comment) => {
    const ratingData = {
      stars: rating,
      comment: comment,
      business: selectedBusinessId,
    };

    createRating(ratingData);

    f7.popup.close();
    closeRatingForm();
    loadBusinesses();
  };

  const fetchBusinessData = async (businessId) => {
    setRatings(await fetchRatingsByBusinessId(businessId));
  };

  const closeRatingsPage = () => {
    setRatings([]);
  };

  const loadBusinesses = async () => {
    try {
      const businessList = await fetchAllBusinesses();
      setBusinesses(businessList);
    } catch (error) {
      console.error("Failed to load businesses:", error);
    }
  };

  useEffect(() => {
    loadBusinesses();
  }, []);

  const getBusinessText = (business) => (
    <BusinessItem
      loggedIn={loggedIn}
      business={business}
      onBusinessSelected={(businessId) => setSelectedBusinessId(businessId)}
    />
  );

  return (
    <div>
      <List mediaList accordionList>
        {businesses.map((business) => (
          <ListItem
            onClick={() => fetchBusinessData(business.id)}
            key={business.id}
            text={getBusinessText(business)}
          ></ListItem>
        ))}
      </List>{" "}
      <RatingForm onClose={closeRatingForm} onSubmit={(rating, comment) => submitRating(rating, comment)} />
      {ratings.length > 0 ? (
        <Page>
          <RatingsDisplay ratings={ratings} closeRatings={() => closeRatingsPage()} />
        </Page>
      ) : (
        <></>
      )}
    </div>
  );
};

export default BusinessList;
