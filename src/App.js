import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

//import Container from "react-bootstrap/Container";
//import Row from "react-bootstrap/Row";
//import Col from "react-bootstrap/Col";

import NavBar from "./components/NavBar/NavBar";
import "bootstrap/dist/css/bootstrap.min.css";

import { useDispatch } from "react-redux";
import { getPosts } from "./actions/posts";

import "./App.css";
//import PostForm from "./components/Form/PostForm";
//import Posts from "./components/Posts/Posts";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";

function App() {
  const [currentId, setCurrentId] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);

  return (
    <>
      <Router>
        <NavBar />
        {/* <Container>
          <Row>
            <Col>
              
            </Col>
          </Row>
        </Container> */}

        <Routes>
          <Route
            path="/"
            element={<Home currentId={currentId} setCurrentId={setCurrentId} />}
          />
          <Route path="/auth" element={<Auth />} />
          <Route path="/posts/search" element={<Home />} />
          <Route path="/posts/:id" element={<Home />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
