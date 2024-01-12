// RatingForm.jsx
import React, { useState } from "react";
import { Popup, Page, BlockTitle, Block, List, ListItem, ListInput, Button } from "framework7-react";

const RatingForm = ({ onClose, onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = () => {
    onSubmit(rating, comment);
    onClose();
  };

  return (
    <Popup id="rating-popup">
      <Page>
        <List>
          <BlockTitle>Rate this Business</BlockTitle>
          <ListInput type="range" min="0" max="5" step="1" value={rating} onInput={(e) => setRating(e.target.value)} />
          <ListItem>{rating}/5 Sterne</ListItem>
          <ListInput
            type="text"
            placeholder="Your comment..."
            value={comment}
            onInput={(e) => setComment(e.target.value)}
          />
          <div className="text-center">
            <Button fill onClick={handleSubmit}>
              Submit
            </Button>
          </div>
        </List>
      </Page>
    </Popup>
  );
};

export default RatingForm;
