import React, { useRef, useState } from "react";
import styles from "./PostComment.module.css";
import { Button, Card, Container, Form } from "react-bootstrap";
import { toast } from "react-toastify";

import { createCommentAction } from "../../action/comment.action";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";

const PostComment = ({ createCommentAction }) => {
  //useStates
  const [commentText, setCommentText] = useState("");
  const [commentImage, setCommentImage] = useState(null);
  const { group_id, problem_id } = useParams();
  const ref = useRef(null);

  //file handling
  const handleFile = (e) => {
    if (e.target.files) {
      setCommentImage(e.target.files[0]);
    } else {
      setCommentImage(null);
    }
  };
  //button onsubmit
  const onSubmit = async (e) => {
    e.preventDefault();
    if (commentText.replace(/\s/g, "") === "") {
      toast.error("Text is required!");
      return;
    }
    console.log(problem_id);
    let check = await createCommentAction(
      commentText,
      commentImage,
      problem_id
    );
    if (check === true) {
      setCommentText("");
      setCommentImage(null);
      ref.current.value = "";
    }
  };

  return (
    <Container>
      <Card className="my-4 shadow">
        <Card.Body>
          <Form>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Control
                as="textarea"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Control ref={ref} type="file" onChange={handleFile} />
            </Form.Group>
            <Button variant="primary" type="submit" onClick={onSubmit}>
              Post the Comment
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};
export default connect(null, { createCommentAction })(PostComment);
