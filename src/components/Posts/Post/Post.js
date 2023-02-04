import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import moment from "moment";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FaThumbsUp, FaTrashAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { deletePost } from "../../../actions/posts";

function Post({ post, setCurrentId }) {
  const dispatch = useDispatch();

  const deletePostHandler = (id) => {
    dispatch(deletePost(id));
  };
  return (
    <>
      <Card className="m-3" bg="dark" text="white" style={{ width: "20rem" }}>
        {/* <Card.ImgOverlay> */}
        <Container className="img-overlay">
          <Row>
            <Col sm={10}>
              <Card.Subtitle className="mb-2 mt-3 ">
                {post.creator}
              </Card.Subtitle>
            </Col>
            <Col sm={2}>
              <Button
                variant=""
                onClick={() => {
                  setCurrentId(post._id);
                }}
              >
                <h4 className="text-white">...</h4>
              </Button>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card.Subtitle className="mb-2 text-muted">
                {moment(post.createdAt).fromNow()}
              </Card.Subtitle>
            </Col>
          </Row>
        </Container>
        {/* </Card.ImgOverlay> */}
        <Card.Img height="200" variant="top" src={post.selectedFile} />
        <Card.Body className="text-center">
          <Card.Title>{post.title}</Card.Title>
          <br />

          <Card.Text>
            {post.message}

            <br />
            <br />
            <span className="text-muted">
              {post.tags.map((tag) => `#${tag} `)}
            </span>
          </Card.Text>
          <Container>
            <Row className="mt-4 mb-1">
              <Col sm={6}>
                <Button variant="outline-light">
                  <FaThumbsUp /> Like {post.likeCount}
                </Button>
              </Col>
              <Col sm={6}>
                <Button
                  onClick={() => deletePostHandler(post._id)}
                  variant="outline-light"
                >
                  <FaTrashAlt /> Delete
                </Button>
              </Col>
            </Row>
          </Container>
        </Card.Body>
      </Card>
    </>
  );
}

export default Post;
