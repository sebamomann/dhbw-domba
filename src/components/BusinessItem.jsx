import { Block, Icon, Button, f7 } from "framework7-react";
import React from "react";

/**
 * Representation of a Business Card with all necessary information
 *
 * @param {*} param0  Business to display
 *
 * @returns
 */
const BusinessItem = ({ business }) => {
  /**
   * Create a visual representation of the number of stars (in form of HTML).
   * Use full star, half star and empty star icons to represent a x/5 s score including half values.
   *
   * @param {number} rating  Rating out of 5
   *
   * @returns List of start icons in correct order
   */
  const renderStars = (rating) => {
    const totalStars = 5;
    const stars = [];

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

  // display message if business not available
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
        {/* Load image from pocketbase server - no api token needed */}
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
