import React from "react";
import { Block, Icon, BlockTitle } from "framework7-react";

/**
 * Component displaying list of ratings for a given business
 *
 * @param {*} param0 Ratings objects that should be displayed.
 * @returns
 */
const RatingsList = ({ ratings }) => {
  /**
   * Create a visual representation of the number of stars (in form of HTML).
   * Similar to {@link BusinessItem.renderStars} but without half stars.
   *
   * @param {number} rating  Rating out of 5
   *
   * @returns List of start icons in correct order
   */
  const renderStars = (rating) => {
    const totalStars = 5;
    let stars = [];

    for (let i = 0; i < rating; i++) {
      stars.push(<Icon key={`full_${i}`} f7="star_fill" style={{ fontSize: "16px" }} />);
    }

    for (let i = rating; i < totalStars; i++) {
      stars.push(<Icon key={`empty_${i}`} f7="star" style={{ fontSize: "16px" }} />);
    }

    return stars;
  };

  return (
    <Block>
      {ratings && ratings.length > 0 ? (
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
  );
};

export default RatingsList;
