import { Block, Button, Icon, Page } from "framework7-react";
import React, { useEffect, useState } from "react";

import BusinessItem from "../components/BusinessItem";
import RatingPopup from "../components/RatingPopup";
import RatingsList from "../components/RatingsList";

import { eventEmitter } from "../js/eventemitter";
import { fetchRatingsByBusinessId, getBusinessById } from "../services/businessService";

const BusinessPage = ({ f7route, loggedIn, f7router }) => {
  const [business, setBusiness] = useState(null);
  const [ratings, setRatings] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  /** Business ID - fetch from current path /business/:id */
  const businessId = f7route.params.id;

  /**
   * Initialize component. Load business data. Load ratings.
   */
  useEffect(() => {
    const loadBusinessAndRatings = async () => {
      try {
        const loadedBusiness = await getBusinessById(businessId);
        setBusiness(loadedBusiness);

        const loadedRatings = await fetchRatingsByBusinessId(businessId);
        setRatings(loadedRatings);
      } catch (err) {
        console.error("An error occurred while loading data.", err);
        eventEmitter.emit("error", "An error occurred while loading data.");
      }
    };

    loadBusinessAndRatings();
  }, [businessId]);

  /**
   * Fetch ratings from pocketbase for a specific business.
   * Update rating field. Do not return ratings.
   *
   * @param {string} businessId   Collection entry ID for business
   *
   * @returns void
   */
  const loadRatings = async (businessId) => {
    try {
      const ratings = await fetchRatingsByBusinessId(businessId);
      setRatings(ratings);
    } catch (error) {
      console.error("An error occurred while while loading ratings", err);
      eventEmitter.emit("error", "An error occurred while while loading ratings");
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
