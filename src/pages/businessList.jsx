import React, { useState, useEffect } from "react";
import { createRating, fetchAllBusinesses, fetchRatingsByBusinessId, isLoggedIn } from "./../services/businessService";
import { Page, Navbar, List, ListItem, Link, Button, f7, AccordionContent, Block } from "framework7-react";
import RatingForm from "./ratingForm";
import RatingsDisplay from "./ratingsDisplay";
import BusinessItem from "./BusinessItem";

const BusinessList = () => {
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

    console.log(ratingData);

    createRating(ratingData);

    f7.popup.close();
    closeRatingForm();
  };

  const fetchBusinessData = async (businessId) => {
    //console.log(businessId);
    setRatings(await fetchRatingsByBusinessId(businessId));
  };

  useEffect(() => {
    const loadBusinesses = async () => {
      try {
        const businessList = await fetchAllBusinesses();
        setBusinesses(businessList);
      } catch (error) {
        console.error("Failed to load businesses:", error);
      }
    };

    loadBusinesses();
  }, []);

  const getBusinessText = (business) => (
    <BusinessItem business={business} onBusinessSelected={(businessId) => setSelectedBusinessId(businessId)} />
  );

  return (
    <div>
      <List mediaList accordionList>
        {businesses.map((business) => (
          <ListItem
            accordionItem
            onClick={() => fetchBusinessData(business.id)}
            key={business.id}
            text={getBusinessText(business)}
          >
            <AccordionContent>
              <RatingsDisplay ratings={ratings} />
            </AccordionContent>
          </ListItem>
        ))}
      </List>{" "}
      <RatingForm onClose={closeRatingForm} onSubmit={(rating, comment) => submitRating(rating, comment)} />
    </div>
  );
};

export default BusinessList;
