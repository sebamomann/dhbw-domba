import { ListItem, Block, Icon, Button, f7 } from "framework7-react";
import { isLoggedIn } from "../services/businessService";

const BusinessItem = ({ business, onBusinessSelected }) => {
  const userIsLoggedIn = isLoggedIn();

  const login = () => {
    f7.loginScreen.open("#my-login-screen");
  };

  const openRatingForm = (businessId) => {
    onBusinessSelected(businessId);
    f7.popup.open("#rating-popup");
  };

  const renderStars = (rating) => {
    const totalStars = 5;
    let stars = [];

    // Adding full stars
    for (let i = 0; i < Math.floor(rating); i++) {
      stars.push(<Icon key={`full_${i}`} f7="star_fill" style={{ fontSize: "16px" }} />);
    }

    // Adding half star if needed
    if (rating % 1 !== 0) {
      stars.push(<Icon key="star_lefthalf_fill" f7="star_lefthalf_fill" style={{ fontSize: "16px" }} />);
    }

    // Adding empty stars
    for (let i = Math.ceil(rating); i < totalStars; i++) {
      stars.push(<Icon key={`empty_${i}`} f7="star" style={{ fontSize: "16px" }} />);
    }

    return stars;
  };

  return (
    <Block strong style={{ textAlign: "center" }}>
      {/* Business name and average rating at the top */}

      <div style={{ fontWeight: "bold", fontSize: "18px" }}>{business.name}</div>

      <div style={{ marginBottom: "20px" }}>{renderStars(business.averageRating)}</div>

      {/* Description */}
      <div style={{ marginBottom: "8px" }}>
        <Icon f7="info_circle" style={{ marginRight: "8px" }} />
        {business.description}
      </div>

      {/* Contact and location side by side */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Icon f7="phone_fill" style={{ marginRight: "8px" }} />
          {business.contact}
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Icon f7="map_pin_ellipse" style={{ marginRight: "8px" }} />
          {business.location}
        </div>
      </div>

      {userIsLoggedIn ? (
        <Button
          onClick={() => openRatingForm(business.id)}
          style={{
            border: "1px solid gray",
            padding: "8px",
            borderRadius: "5px",
            backgroundColor: "white",
            margin: "16px auto 0px",
            display: "block",
            width: "fit-content",
          }}
        >
          Rate <Icon f7="star" style={{ verticalAlign: "baseline", fontSize: "10px" }} />
        </Button>
      ) : (
        <Button
          onClick={() => login()}
          style={{
            border: "1px solid gray",
            padding: "8px",
            borderRadius: "5px",
            backgroundColor: "white",
            margin: "16px auto 0px",
            display: "block",
            width: "fit-content",
          }}
        >
          Rate <Icon f7="star" style={{ verticalAlign: "baseline", fontSize: "16px" }} />
        </Button>
      )}
    </Block>
  );
};

export default BusinessItem;
