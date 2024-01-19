import React, { useState, useEffect } from "react";
import { Page, BlockTitle, Icon, Button, Block } from "framework7-react";
import BusinessItem from "../components/BusinessItem";
import { fetchRatingsByBusinessId, getBusinessById } from "../services/businessService";
import RatingPopup from "../components/RatingPopup";
import { eventEmitter } from "../js/eventemitter";
import RatingsList from "../components/RatingsList";

const BusinessPage = ({ f7route, loggedIn, f7router }) => {
  const [business, setBusiness] = useState(null);
  const [ratings, setRatings] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const businessId = f7route.params.id;

  useEffect(() => {
    const loadBusinessAndRatings = async () => {
      try {
        const loadedBusiness = await getBusinessById(businessId);
        setBusiness(loadedBusiness);

        const loadedRatings = await fetchRatingsByBusinessId(businessId);
        setRatings(loadedRatings);
      } catch (err) {
        console.error("Failed to load business or ratings:", err);
        eventEmitter.emit("error", "An error occurred while loading data.");
      }
    };

    loadBusinessAndRatings();
  }, [businessId]);

  const loadRatings = async (businessId) => {
    try {
      const ratings = await fetchRatingsByBusinessId(businessId);
      setRatings(ratings);
    } catch (error) {
      console.error("Failed to load ratings:", error);
    }
  };

  return (
    <Page>
      <Block>
        <Button
          className="back-button"
          onClick={() => {
            f7router.back();
          }}
        >
          <Icon f7="chevron_left" className="back-icon" /> Zurück
        </Button>
        {business && <BusinessItem loggedIn={loggedIn} business={business} />}
      </Block>
      <Block>
        <Button fill onClick={() => setIsPopupOpen(true)}>
          Jetzt bewerten!
        </Button>
      </Block>
      <RatingsList ratings={ratings}></RatingsList>
      {/* Rating Popup */}
      <RatingPopup
        formSubmitted={() => loadRatings(businessId)}
        businessId={businessId}
        isPopupOpen={isPopupOpen}
        closePopup={() => setIsPopupOpen(false)}
      />
    </Page>
  );
};

export default BusinessPage;
