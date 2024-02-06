import React, { useState } from "react";
import { Page, List, Block, Button, ListInput } from "framework7-react";

import { createBusiness } from "../services/businessService";
import { eventEmitter } from "../js/eventemitter";

/**
 * Business creation page containing form to create new business
 *
 * @param {*} param0  router object
 *
 * @returns
 */
const CreateBusinessPage = ({ f7router }) => {
  // input field states
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [contact, setContact] = useState("");
  const [location, setLocation] = useState("");
  const [file, setFile] = useState(null);

  /**
   * Execute business creation.<br/>
   * Read input fields and create DTO for the API call.
   *
   * @returns void
   */
  const handleSubmit = async () => {
    try {
      const businessData = {
        name,
        description,
        contact,
        location,
        image: file,
      };

      await createBusiness(businessData);
      clearFields();

      // trigger creation event and navigate back
      eventEmitter.emit("businessCreated", null);
      f7router.back();
    } catch (err) {
      console.error("An error occurred while creating the business.", err);
      eventEmitter.emit("error", "An error occurred while creating the business.");
    }
  };

  /**
   * Clear all fields. Needed if user wants to create multiple entries.<br/>
   * Otherwise, re-navigating to creation page still contains values from previous submit.
   */
  const clearFields = () => {
    setName("");
    setDescription("");
    setContact("");
    setLocation("");
    setFile(null);
  };

  return (
    <Page>
      <Block>
        <h1 className="page-title">Neues Business</h1>

        <List form>
          <ListInput placeholder="Name" type="text" value={name} onInput={(e) => setName(e.target.value)} />
          <ListInput
            placeholder="Beschreibung"
            type="textarea"
            value={description}
            onInput={(e) => setDescription(e.target.value)}
          />
          <ListInput placeholder="Kontakt" type="text" value={contact} onInput={(e) => setContact(e.target.value)} />
          <ListInput placeholder="Adresse" type="text" value={location} onInput={(e) => setLocation(e.target.value)} />
          <ListInput placeholder="Datei" type="file" value={file} onInput={(e) => setFile(e.target.files[0])} />
        </List>

        <Block className="button-group">
          <Button onClick={() => f7router.back()} className="back-button">
            Zurück
          </Button>
          <Button fill onClick={handleSubmit} className="save-button">
            Speichern
          </Button>
        </Block>
      </Block>
    </Page>
  );
};

export default CreateBusinessPage;
