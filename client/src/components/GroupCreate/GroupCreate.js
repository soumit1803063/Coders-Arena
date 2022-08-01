import React, { useRef, useState } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import styles from "./GroupCreate.module.css";
import { createGroupAction } from "../../action/group.action";
import { connect } from "react-redux";
const GroupCreate = ({ createGroupAction }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const ref = useRef(null);

  const handleFile = (e) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
    } else {
      setImage(null);
    }
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      toast.error("Image is required!");
      return;
    }
    let check = await createGroupAction(name, description, image);
    if (check === true) {
      setName("");
      setDescription("");
      setImage(null);
      ref.current.value = "";
    }
  };

  return (
    <Container>
      <Card className="my-4 shadow">
        <Card.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Group-Name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Display Image</Form.Label>
              <Form.Control ref={ref} type="file" onChange={handleFile} />
            </Form.Group>
            <Button variant="primary" type="submit" onClick={onSubmit}>
              Create Group
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default connect(null, { createGroupAction })(GroupCreate);
