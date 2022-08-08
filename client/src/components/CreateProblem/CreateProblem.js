import React, { useRef, useState } from "react";
import styles from "./CreateProblem.module.css";
import { MultiSelect } from "@mantine/core";
import { Button, Card, Container, Form } from "react-bootstrap";
import { toast } from "react-toastify";

import { createProblemAction } from "../../action/problem.action";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
//
//
//create problem
const CreateProblem = ({ createProblemAction }) => {
  //useStates
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [tags, setTags] = useState([]);
  const { id } = useParams();
  const ref = useRef(null);

  //list of tags
  const data = [
    { value: "binary_search", label: "Binary Search" },
    { value: "2_sat", label: "2-Sat" },
    { value: "bitmask", label: "Bitmask" },
    { value: "bruteforce", label: "Brute Force" },
    { value: "chinese_remainder_theorem", label: "Chinese Remainder Theorem" },
    { value: "combinatorics", label: "Combinatorics" },
    { value: "constructive_algorithm", label: "Constructive Algorithm" },
    { value: "data_structure", label: "Data Structure" },
    { value: "divide_and_conquer", label: "Divide and Conquer " },
  ];

  //file handling
  const handleFile = (e) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
    } else {
      setImage(null);
    }
  };
  //button onsubmit
  const onSubmit = async (e) => {
    e.preventDefault();
    if (name.replace(/\s/g, "") === "" && link.replace(/\s/g, "") === "") {
      toast.error("Name or Link is required!");
      return;
    }
    if (tags.length === 0) {
      toast.error("At least one tag is required!");
      return;
    }
    let check = await createProblemAction(
      name,
      link,
      description,
      image,
      tags,
      id
    );
    if (check === true) {
      setName("");
      setLink("");
      setDescription("");
      setImage(null);
      setTags([]);
      ref.current.value = "";
    }
  };

  return (
    <Container>
      <Card className="my-4 shadow">
        <Card.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Problem-Name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Problem-Link</Form.Label>
              <Form.Control
                type="text"
                value={link}
                onChange={(e) => setLink(e.target.value)}
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
              <Form.Label>Image</Form.Label>
              <Form.Control ref={ref} type="file" onChange={handleFile} />
            </Form.Group>

            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Tags</Form.Label>
              <MultiSelect
                data={data}
                placeholder="Pick the tag/s"
                searchable
                value={tags}
                onChange={(e) => {
                  setTags(e);
                  console.log(e);
                }}
                nothingFound="Nothing found"
              />
            </Form.Group>

            <Button variant="primary" type="submit" onClick={onSubmit}>
              Post the Problem
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default connect(null, { createProblemAction })(CreateProblem);
