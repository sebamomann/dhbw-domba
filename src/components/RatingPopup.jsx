import React, { useState } from "react";
import { Popup, Block, List, ListInput, Button, Icon } from "framework7-react";
import { createRating } from "../services/businessService";
import { eventEmitter } from "../js/eventemitter";

const RatingPopup = ({ businessId, formSubmitted, isPopupOpen, closePopup }) => {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);

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

  const handleSubmit = async () => {
    try {
      await createRating({ stars: rating, comment, business: businessId });
      setComment("");
      setRating(0);
      formSubmitted();
      closePopup();
    } catch (err) {
      eventEmitter.emit("error", "Error submitting rating. Please try again.");
      console.error("Error submitting rating:", err);
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
