// רק אלו של הכרטיס עצמו
import React, { useState, useRef } from "react";
import "./PostCard.css";

// אם יש bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import { FaThumbsUp, FaTrashAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { deletePost, likePost } from "../../../actions/posts";
import moment from "moment";

export default function PostCard({ post, setCurrentId }) {
  const [xRotation, setXRotation] = useState(0);
  const [yRotation, setYRotation] = useState(0);
  const cardRef = useRef(null);
  const imgRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  //const sizesboxRef = useRef(null);
  const purchaseRef = useRef(null);

  function handleMouseMove(event) {
    const card = cardRef.current;
    const { offsetWidth: width, offsetHeight: height } = card;
    const { clientX, clientY } = event;
    const x = clientX - card.offsetLeft - width / 2;
    const y = clientY - card.offsetTop - height / 2;

    // כמה רגוע יהיה הסיבוב
    var mult = 30;

    setXRotation((y / height) * mult);
    setYRotation((x / width) * mult);
  }
  function handleMouseEnter() {
    // כולם כדי שהתוכן של הכרטיס יסתובב כל אחד בכיוון שלו
    //const img = imgRef.current;
    //const title = titleRef.current;
    //const sizesBox = sizesboxRef.current;
    //const purchase = purchaseRef.current;
    //const desc = descRef.current;
    //title.style.transform = "translateZ(150px)";
    //img.style.transform = "translateZ(100px) rotateZ(-45deg)";
    //sizesBox.style.transform = "translateZ(100px)";
    //purchase.style.transform = "translateZ(75px)";
    //desc.style.transform = "translateZ(75px)";
  }
  function handleMouseLeave() {
    setXRotation(0);
    setYRotation(0);
    // כולם כדי שהתוכן של הכרטיס יסתובב כל אחד בכיוון שלו

    //const img = imgRef.current;
    //const title = titleRef.current;
    //const sizesBox = sizesboxRef.current;
    //const purchase = purchaseRef.current;
    //title.style.transform = "translateZ(0px)";
    //img.style.transform = "translateZ(0px) rotateZ(0deg)";
    //sizesBox.style.transform = "translateZ(0px)";
    //purchase.style.transform = "translateZ(0px)";
  }

  const dispatch = useDispatch();

  const user = JSON.parse(localStorage.getItem("user"));

  const deletePostHandler = (id) => {
    dispatch(deletePost(id));
  };

  const likePostHandler = (id) => {
    dispatch(likePost(id));
  };

  const Likes = () => {
    if (post.likes.length > 0) {
      return post.likes.find(
        (like) =>
          like === (post?.user?.result?.googleId || post?.user?.result?._id)
      ) ? (
        <div className="d-flex justify-content-center">
          <FaThumbsUp size="1.2em" color="blue" />
          &nbsp;
          {post.likes.length > 2
            ? `You and ${post.likes.length - 1} others`
            : `${post.likes.length} like${post.likes.length > 1 ? "s" : ""}`}
        </div>
      ) : (
        <div className="d-flex justify-content-center">
          <FaThumbsUp size="1.2em" color="blue" />
          &nbsp;{post.likes.length} {post.likes.length === 1 ? "Like" : "Likes"}
        </div>
      );
    }

    return (
      <div className="d-flex justify-content-center">
        <FaThumbsUp size="1.2em" color="blue" />
        &nbsp;Like
      </div>
    );
  };

  return (
    <div
      className="card m-4"
      ref={cardRef}
      style={{
        transform: `rotateX(${xRotation}deg) rotateY(${yRotation}deg)`,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img
        ref={imgRef}
        src={post.selectedFile}
        alt="Nike-Shoe"
        className="sneaaker-img mt-3"
        height="200px"
      />
      <Container>
        <Row>
          <Col sm={10}>
            <h3 className="title mt-1" ref={titleRef}>
              {post.name}
            </h3>
          </Col>
          <Col sm={2}>
            {user?.result?._id === post?.creator && (
              <button
                className="btn btn-outline"
                onClick={() => setCurrentId(post._id)}
              >
                <h4 className="text-white">...</h4>
              </button>
            )}
          </Col>
        </Row>

        <Row>
          <Col>
            <h5 className="mb-2 text-muted">
              {moment(post.createdAt).fromNow()}
            </h5>
          </Col>
        </Row>

        <Row>
          <Col>
            <h4>{post.title}</h4>
          </Col>
        </Row>
        <Row>
          <Col>
            <p ref={descRef}>{post.message}</p>
          </Col>
        </Row>

        <Row className="mb-1">
          <Col>
            <span className="text-muted">
              {post.tags.map((tag) => `#${tag} `)}
            </span>
          </Col>
        </Row>
      </Container>
      <div className="button-box" ref={purchaseRef}>
        <Button
          className="purchase m-1"
          disabled={!user?.result}
          variant=""
          onClick={() => {
            likePostHandler(post._id);
          }}
        >
          <Likes />
        </Button>
        {user?.result?._id === post?.creator && (
          <Button
            className="purchase m-1"
            variant=""
            onClick={() => deletePostHandler(post._id)}
          >
            <FaTrashAlt size="1.2em" color="red" /> DELETE
          </Button>
        )}
      </div>
    </div>
  );
}
