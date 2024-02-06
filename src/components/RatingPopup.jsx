import React, { useState } from "react";
import { Popup, Block, List, ListInput, Button, Icon } from "framework7-react";
import { createRating } from "../services/businessService";
import { eventEmitter } from "../js/eventemitter";

/**
 * Popup component to allow rating of business.
 * Popup is self contained.
 *
 * @param {*} param0  ID of business to rate, callback after submission, popup state, callback for popup cancel
 *
 * @returns
 */
const RatingPopup = ({ businessId, formSubmitted, isPopupOpen, closePopup }) => {
  // state of current comment (persistent when closing popup and reopening it)
  const [comment, setComment] = useState("");
  // state of current rating (persistent when closing popup and reopening it)
  const [rating, setRating] = useState(0);

  /**
   * HTML Element list of stars. Adapts based on selection. Number of selected stars will be filled, rest will only be outlined.
   * Click on star will set new rating (based on index)
   *
   * @returns List of start icons in correct order
   */
  const renderStarsClickable = () => {
    const totalStars = 5;
    let stars = [];

    for (let i = 0; i < totalStars; i++) {
      stars.push(
        <div key={i} onClick={() => setRating(i + 1)} style={{ width: "fit-content", display: "inline-block" }}>
          <Icon key={i} f7={i < rating ? "star_fill" : "star"} style={{ fontSize: "26px", cursor: "pointer" }} />
        </div>
      );
    }

    return stars;
  };

  /**
   * Submit ratings form to API.
   * Reset form data
   */
  const handleSubmit = async () => {
    try {
      await createRating({ stars: rating, comment, business: businessId });

      setComment("");
      setRating(0);
      formSubmitted();
      closePopup();
    } catch (err) {
      console.error("Error submitting rating:", err);
      eventEmitter.emit("error", "Error submitting rating. Please try again.");
    }
  };

  return (
    <Popup id="rating-popup" opened={isPopupOpen}>
      <Block>
        <List>
          <h1 className="popup-title">Bewertung</h1>
          <Block className="star-rating">{renderStarsClickable()}</Block>
          <ListInput
            type="textarea"
            placeholder="Kommentar ..."
            value={comment}
            onInput={(e) => setComment(e.target.value)}
          />
          <Block className="button-group">
            <Button onClick={closePopup} className="back-button">
              Zurück
            </Button>
            <Button fill onClick={handleSubmit} className="save-button">
              Speichern
            </Button>
          </Block>
        </List>
      </Block>
    </Popup>
  );
};

export default RatingPopup;
