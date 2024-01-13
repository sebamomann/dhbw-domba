import { Block, Icon, Button, f7 } from "framework7-react";
import React from "react";

const BusinessItem = ({ business }) => {
  const renderStars = (rating) => {
    const totalStars = 5;
    const stars = [];

    // Create stars based on rating
    for (let i = 1; i <= totalStars; i++) {
      if (i <= rating) {
        stars.push(<Icon key={`full_${i}`} f7="star_fill" className="star-icon" />);
      } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
        stars.push(<Icon key="star_half_fill" f7="star_lefthalf_fill" className="star-icon" />);
      } else {
        stars.push(<Icon key={`empty_${i}`} f7="star" className="star-icon" />);
      }
    }

    return stars;
  };

  if (!business) {
    console.error("No business data provided");
    return <div>Business information is not available.</div>;
  }

  return (
    <Block strong className="business-item">
      <div className="business-header">
        <div className="business-name">{business.name}</div>
        <Button onClick={() => f7.views.main.router.navigate(`/business/${business.id}`)}>
          {renderStars(business.averageRating)}
        </Button>
      </div>

      <div className="business-description">{business.description}</div>

      <div className="business-image-container">
        <img
          src={`https://pocketbase.sebamomann.de/api/files/business/${business.id}/${business.image}`}
          className="business-image"
          alt="Business"
        />
      </div>

      <div className="business-contact">
        <Icon f7="chat_bubble_fill" className="icon" />
        {business.contact}
      </div>

      <div className="business-location">
        <Icon f7="map_pin_ellipse" className="icon" />
        <a href={`https://maps.google.com/?q=${business.location}`} className="external">
          {business.location}
        </a>
      </div>
    </Block>
  );
};

export default BusinessItem;
