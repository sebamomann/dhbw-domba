import { Block, Icon, Button, f7 } from "framework7-react";
import React from "react";

const BusinessItem = ({ business, loggedIn, onBusinessSelected }) => {
  const renderStars = (rating) => {
    const totalStars = 5;
    let stars = [];

    let style = { fontSize: "20px", verticalAlign: "baseline" };

    // Adding full stars
    for (let i = 0; i < Math.floor(rating); i++) {
      stars.push(<Icon key={`full_${i}`} f7="star_fill" style={style} />);
    }

    // Adding half star if needed
    if (rating % 1 !== 0) {
      stars.push(<Icon key="star_lefthalf_fill" f7="star_lefthalf_fill" style={style} />);
    }

    // Adding empty stars
    for (let i = Math.ceil(rating); i < totalStars; i++) {
      stars.push(<Icon key={`empty_${i}`} f7="star" style={style} />);
    }

    return stars;
  };

  return (
    <Block strong style={{ textAlign: "center", borderRadius: "8px", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: "16px" }}>
        <div style={{ fontWeight: "bold", fontSize: "18px", textAlign: "left" }}>{business.name}</div>
        <Button
          onClick={() => {
            f7.views.main.router.navigate(`/business/${business.id}`);
          }}
        >
          {renderStars(business.averageRating)}
        </Button>
      </div>

      <div style={{ marginBottom: "20px", textAlign: "left" }}>{business.description}</div>

      <div style={{ marginBottom: "20px" }}>
        <img
          src={"https://pocketbase.sebamomann.de/api/files/business/" + business.id + "/" + business.image}
          style={{ width: "100%", height: "auto", borderRadius: "4px" }}
          alt="Business"
        />
      </div>

      <div style={{ marginBottom: "8px", textAlign: "left", fontSize: "14px", verticalAlign: "sub" }}>
        <Icon f7="phone_fill" style={{ marginRight: "8px", fontSize: "24px" }} />
        {business.contact}
      </div>

      <div style={{ marginBottom: "8px", textAlign: "left", fontSize: "14px", verticalAlign: "sub" }}>
        <Icon f7="map_pin_ellipse" style={{ marginRight: "8px", fontSize: "24px" }} />
        {business.location}
      </div>
    </Block>
  );
};

export default BusinessItem;
