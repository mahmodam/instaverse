import React from "react";
//import { useDispatch } from "react-redux";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Posts from "../Posts/Posts";
import PostForm from "../Form/PostForm";

//import { getPosts } from "../../actions/posts";

function Home({ currentId, setCurrentId }) {
  //   const [currentId, setCurrentId] = useState(null);

  //   const dispatch = useDispatch();

  //   useEffect(() => {
  //     dispatch(getPosts());
  //   }, [currentId, dispatch]);

  return (
    <>
      <Container>
        <Row>
          <Col sm={8}>
            <Posts setCurrentId={setCurrentId} />
          </Col>
          <Col sm={4}>
            <PostForm currentId={currentId} setCurrentId={setCurrentId} />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Home;
