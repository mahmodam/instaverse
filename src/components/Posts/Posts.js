import React from "react";
//import Post from "./Post/Post";
import { useSelector } from "react-redux";
import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import PostCard from "./Post/PostCard";

function Posts({ setCurrentId }) {
  const posts = useSelector((state) => state.posts);

  //console.log(posts);

  return (
    <>
      {!posts.length ? (
        <Spinner animation="border" role="status" variant="info">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <Container className="container">
          <Row>
            {posts.map((post) => (
              <Col key={post._id}>
                {/* <Post post={post} setCurrentId={setCurrentId} /> */}
                <PostCard post={post} setCurrentId={setCurrentId} />
              </Col>
            ))}
          </Row>
        </Container>
      )}
    </>
  );
}

export default Posts;
