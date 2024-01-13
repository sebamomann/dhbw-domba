import React, { useState, useEffect } from "react";
import { Page, BlockTitle, Icon, Button, Block } from "framework7-react";
import BusinessItem from "../components/BusinessItem";
import { fetchRatingsByBusinessId, getBusinessById } from "../services/businessService";
import RatingPopup from "../components/RatingPopup";
import { eventEmitter } from "../js/eventemitter";

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

  const renderStars = (rating) => {
    const totalStars = 5;
    let stars = [];

    // Adding full stars
    for (let i = 0; i < rating; i++) {
      stars.push(<Icon key={`full_${i}`} f7="star_fill" style={{ fontSize: "16px" }} />);
    }

    // Adding empty stars if needed
    for (let i = rating; i < totalStars; i++) {
      stars.push(<Icon key={`empty_${i}`} f7="star" style={{ fontSize: "16px" }} />);
    }

    return stars;
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
      <Block>
        {ratings.length > 0 ? (
          ratings.map((item, index) => (
            <Block
              key={index}
              strong
              style={{ borderRadius: "8px", marginBottom: "0px", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)" }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                {renderStars(item.stars)}
                <span style={{ fontWeight: "bold", marginLeft: "10px", fontSize: "18px" }}>
                  {item?.expand?.creator.name}
                </span>
              </div>
              <p>{item.comment}</p>
              <BlockTitle />
            </Block>
          ))
        ) : (
          <></>
        )}
      </Block>
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
