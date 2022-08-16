import styles from "./SearchGroup.module.css";
import React, { useRef, useState } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import { toast } from "react-toastify";

import { searchGroupAction } from "../../action/group.action";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
//
//

const SearchGroup = () => {
  const [groupName, setGroupName] = useState("");
  const navigate = useNavigate();
  const onSubmit = async (e) => {
    e.preventDefault();
    if (groupName.replace(/\s/g, "") === "") {
      toast.error("Write a group-name");
      return;
    }
    setGroupName("");
    navigate(`/group/search/${groupName}`);
  };

  return (
    <Container>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div>
          <div className="input-group">
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Control
                  type="text"
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                />
              </Form.Group>
            </Form>
          </div>
        </div>
        <div>
          <Button variant="primary" type="submit" onClick={onSubmit}>
            Search
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default SearchGroup;
