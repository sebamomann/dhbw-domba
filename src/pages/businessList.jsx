import React, { useState, useEffect } from "react";
import { fetchAllBusinesses } from "../services/businessService";
import { List, Block } from "framework7-react";
import BusinessItem from "./BusinessItem";

const BusinessList = ({ loggedIn }) => {
  const [businesses, setBusinesses] = useState([]);

  const loadBusinesses = async () => {
    try {
      const businessList = await fetchAllBusinesses();
      setBusinesses(businessList);
    } catch (error) {
      console.error("Failed to load businesses:", error);
    }
  };

  useEffect(() => {
    loadBusinesses();
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
