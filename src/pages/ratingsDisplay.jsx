import { Block, BlockTitle, Icon, Button } from "framework7-react";

// Function to render stars based on the rating
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

// Your component for displaying ratings
const RatingsDisplay = ({ ratings, closeRatings }) => (
  <div>
    <Button onClick={() => closeRatings()}>Zurück</Button>
    {ratings.length > 0 ? (
      ratings.map((item, index) => (
        <Block key={index} strong>
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
  </div>
);

export default RatingsDisplay;
