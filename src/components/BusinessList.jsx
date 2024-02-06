import React, { useState, useEffect } from "react";
import { fetchAllBusinesses } from "../services/businessService";
import { List, Block, Button, Icon, Page } from "framework7-react";
import BusinessItem from "./BusinessItem";
import { eventEmitter } from "../js/eventemitter";

/**
 * Representation of a Business List containing multiple businesses
 *
 * @param {*} param0  Is user authenticated
 *
 * @returns
 */
const BusinessList = ({ loggedIn }) => {
  // state uf business list. this list will be rendered
  const [businesses, setBusinesses] = useState([]);

  /**
   * Initialize component. Load business data
   */
  useEffect(() => {
    loadBusinesses();

    const subscription = eventEmitter.subscribe("businessCreated", loadBusinesses);

    // Cleanup subscription on component unmount
    return () => {
      // subscription.unsubscribe();
    };
  }, []);

  /**
   * Fetch all businesses from API
   */
  const loadBusinesses = async () => {
    try {
      const businessList = await fetchAllBusinesses();
      setBusinesses(businessList);
    } catch (error) {
      console.error("Failed to load businesses:", error);
      eventEmitter.emit("error", "Failed to load businesses. Please try again later.");
    }
  };

  return (
    // PTR does not properly work
    <Block ptr ptrMousewheel={true} onPtrRefresh={loadBusinesses}>
      <List mediaList>
        {businesses.map((business) => (
          <Block key={business.id}>
            <BusinessItem loggedIn={loggedIn} business={business} />
          </Block>
        ))}
      </List>
    </Block>
  );
};

export default BusinessList;
