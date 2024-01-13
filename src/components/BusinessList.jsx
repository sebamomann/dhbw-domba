import React, { useState, useEffect } from "react";
import { fetchAllBusinesses } from "../services/businessService";
import { List, Block } from "framework7-react";
import BusinessItem from "./BusinessItem";
import { eventEmitter } from "../js/eventemitter";

const BusinessList = ({ loggedIn }) => {
  const [businesses, setBusinesses] = useState([]);

  // Function to load businesses from the server
  const loadBusinesses = async () => {
    try {
      const businessList = await fetchAllBusinesses();
      setBusinesses(businessList);
      console.log("Businesses loaded successfully");
    } catch (error) {
      console.error("Failed to load businesses:", error);
      eventEmitter.emit("error", "Failed to load businesses. Please try again later.");
    }
  };

  useEffect(() => {
    loadBusinesses();

    const subscription = eventEmitter.subscribe("businessCreated", loadBusinesses);

    // Cleanup subscription on component unmount
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <List mediaList>
      {businesses.map((business) => (
        <Block key={business.id}>
          <BusinessItem loggedIn={loggedIn} business={business} />
        </Block>
      ))}
    </List>
  );
};

export default BusinessList;
