import React, { useState } from "react";
import { Page, List, ListItem, Input, Button } from "framework7-react";

const CreateBusinessPage = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [contact, setContact] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = () => {
    // Validate form fields as needed

    // Create a business object with the form data
    const businessData = {
      name,
      description,
      contact,
      location,
    };

    // Pass the businessData to the onSubmit function provided by the parent component
    onSubmit(businessData);

    // Clear form fields
    setName("");
    setDescription("");
    setContact("");
    setLocation("");
  };

  return (
    <Page>
      <List form>
        <ListItem>
          Name
          <Input type="text" value={name} onInput={(e) => setName(e.target.value)} />
        </ListItem>
        <ListItem>
          Description
          <Input type="textarea" value={description} onInput={(e) => setDescription(e.target.value)} />
        </ListItem>
        <ListItem>
          Contact
          <Input type="text" value={contact} onInput={(e) => setContact(e.target.value)} />
        </ListItem>
        <ListItem>
          Location
          <Input type="text" value={location} onInput={(e) => setLocation(e.target.value)} />
        </ListItem>
      </List>

      <div className="text-center">
        <Button fill onClick={handleSubmit}>
          Create Business
        </Button>
      </div>
    </Page>
  );
};

export default CreateBusinessPage;
