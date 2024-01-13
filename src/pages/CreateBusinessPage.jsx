import React, { useState } from "react";
import { Page, List, Block, Button, ListInput } from "framework7-react";
import { createBusiness } from "../services/businessService";
import { eventEmitter } from "../js/eventemitter";

const CreateBusinessPage = ({ f7router }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [contact, setContact] = useState("");
  const [location, setLocation] = useState("");
  const [file, setFile] = useState("");

  const handleSubmit = () => {
    const businessData = {
      name,
      description,
      contact,
      location,
      image: file,
    };

    // Pass the businessData to the onSubmit function provided by the parent component
    createBusiness(businessData);

    // Clear form fields
    setName("");
    setDescription("");
    setContact("");
    setLocation("");
    setFile("");

    eventEmitter.emit("businessCreated", null);

    f7router.back();
  };
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  return (
    <Page>
      <Block>
        <h1 style={{ textAlign: "center" }}>Neues Business</h1>
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

        <Block style={{ display: "flex", gap: "16px" }}>
          <Button onClick={() => f7router.back()} style={{ width: "50%", backgroundColor: "#E1E2EC" }}>
            Zurück
          </Button>
          <Button fill onClick={handleSubmit} style={{ width: "50%" }}>
            Speichern
          </Button>
        </Block>
      </Block>
    </Page>
  );
};

export default CreateBusinessPage;
