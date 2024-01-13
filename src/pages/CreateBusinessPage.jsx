import React, { useState } from "react";
import { Page, List, Block, Button, ListInput } from "framework7-react";
import { createBusiness } from "../services/businessService";
import { eventEmitter } from "../js/eventemitter";

const CreateBusinessPage = ({ f7router }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [contact, setContact] = useState("");
  const [location, setLocation] = useState("");
  const [file, setFile] = useState(null);

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

      // Clear form fields
      setName("");
      setDescription("");
      setContact("");
      setLocation("");
      setFile(null);

      eventEmitter.emit("businessCreated", null);

      f7router.back();
    } catch (err) {
      console.error("Error creating business:", err);
      eventEmitter.emit("error", "An error occurred while creating the business.");
    }
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
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
          <ListInput placeholder="Datei" type="file" value={file} onInput={(e) => handleFileChange(e)} />
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
