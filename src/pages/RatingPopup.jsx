import React, { useState } from "react";
import { Popup, Block, List, ListInput, Button, Icon, f7 } from "framework7-react";
import { createRating } from "../services/businessService";

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
    const ratingData = {
      stars: rating,
      comment: comment,
      business: businessId,
    };

    createRating(ratingData);

    // reset form
    setComment("");
    setRating(0);

    formSubmitted();

    closePopup();
  };

  return (
    <Popup id="rating-popup" opened={isPopupOpen}>
      <Block>
        <List>
          <h1 style={{ textAlign: "center" }}>Bewertung</h1>
          <Block style={{ textAlign: "center" }}>{renderStarsClickable()}</Block>
          <ListInput
            type="text"
            placeholder="Kommentar ..."
            value={comment}
            onInput={(e) => setComment(e.target.value)}
          />
          <Block style={{ display: "flex", gap: "16px" }}>
            <Button onClick={() => closePopup()} style={{ width: "50%", backgroundColor: "#E1E2EC" }}>
              Zurück
            </Button>
            <Button fill onClick={() => handleSubmit()} style={{ width: "50%" }}>
              Speichern
            </Button>
          </Block>
        </List>
      </Block>
    </Popup>
  );
};

export default RatingPopup;
