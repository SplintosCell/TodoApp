import React, { useEffect, useState } from "react";
import TodoElement from "./components/TodoElement";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import {
  MDBFooter,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
} from "mdb-react-ui-kit";
function App() {
  const url = "http://localhost:3001/api/todo";

  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    if(!todos.length) {
      fetch(url)
      .then((response) => response.json())
      .then((todos) => {
        if(todos) {
          setTodos(todos);
        }
      })
      .catch((e) => console.error(e));
    }
  }, []);

  const handleInputChange = (e) => {
    setTodo(e.target.value);
  };

  const handleOnClick = () => {
    if (todo) {
      // ;
      setTodo("");
      fetch(url, {
        method: "POST",
        body: JSON.stringify({ item: todo, done: false }),
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => {
          return response.json();
        })
        .then((r) => {
          setTodos([
            ...todos,
            { item: todo, _id: r ? r._id : null, done: false },
          ]);
        });
    }
  };

  const toggleDone = (id) => {
    const todo = todos.find((todo) => todo._id === id);
    todo.done = !todo.done;
    console.log(todo)
    const urlWithId = `${url}/${id}`;
    fetch(urlWithId, {method: "PATCH", body: JSON.stringify(todo), headers: { "Content-Type": "application/json" },}).then(r => r.json()).then((r) => {
      console.log('r :', r)
      console.log('todo after:', todo)
      setTodos([...todos]);
    }).catch(e => console.log(e))
  };

  const deleteElement = (id) => {
    const filteredTodos = todos.filter(todo=> todo._id !== id);
    setTodos([...filteredTodos])
    fetch(`${url}/${id}`, {method: "DELETE"}).then(r=>r.json()).then(r => console.log('element deleted')).catch(e => console.error(e));
  }

  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Nav className="mx-auto">
            <Nav.Link href="#home">TodoAPP</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <br />
      <main>
        <InputGroup className="mb-3">
          <Form.Control
            type="text"
            value={todo}
            onChange={handleInputChange}
            placeholder="Enter your Todo"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
          />
          <Button
            className="mx-auto"
            variant="primary"
            onClick={handleOnClick}
            id="button-addon2"
          >
            Add
          </Button>
        </InputGroup>
        <div>
          <ul>
            {todos.map((t) => (
              <TodoElement todo={t} key={t._id} toggle={toggleDone} delete={deleteElement}/>
            ))}
          </ul>
        </div>
      </main>
      <MDBFooter
        bgColor="light"
        className="text-center text-lg-start text-muted"
      >
        <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
          <div className="me-5 d-none d-lg-block">
            <span>Get connected with us on social networks:</span>
          </div>

          <div>
            <a  className="me-4 text-reset">
              <MDBIcon fab icon="facebook-f" />
            </a>
            <a  className="me-4 text-reset">
              <MDBIcon fab icon="twitter" />
            </a>
            <a  className="me-4 text-reset">
              <MDBIcon fab icon="google" />
            </a>
            <a  className="me-4 text-reset">
              <MDBIcon fab icon="instagram" />
            </a>
            <a  className="me-4 text-reset">
              <MDBIcon fab icon="linkedin" />
            </a>
            <a  className="me-4 text-reset">
              <MDBIcon fab icon="github" />
            </a>
          </div>
        </section>

        <section className="">
          <MDBContainer className="text-center text-md-start mt-5">
            <MDBRow className="mt-3">
              <MDBCol md="3" lg="4" xl="3" className="mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">
                  <MDBIcon icon="gem" className="me-3" />
                  Company name
                </h6>
                <p>
                  Here you can use rows and columns to organize your footer
                  content. Lorem ipsum dolor sit amet, consectetur adipisicing
                  elit.
                </p>
              </MDBCol>

              <MDBCol md="2" lg="2" xl="2" className="mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Products</h6>
                <p>
                  <a href="#!" className="text-reset">
                    Angular
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset">
                    React
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset">
                    Vue
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset">
                    Laravel
                  </a>
                </p>
              </MDBCol>

              <MDBCol md="3" lg="2" xl="2" className="mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Useful links</h6>
                <p>
                  <a href="#!" className="text-reset">
                    Pricing
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset">
                    Settings
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset">
                    Orders
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset">
                    Help
                  </a>
                </p>
              </MDBCol>

              <MDBCol md="4" lg="3" xl="3" className="mx-auto mb-md-0 mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
                <p>
                  <MDBIcon icon="home" className="me-2" />
                  New York, NY 10012, US
                </p>
                <p>
                  <MDBIcon icon="envelope" className="me-3" />
                  info@example.com
                </p>
                <p>
                  <MDBIcon icon="phone" className="me-3" /> + 01 234 567 88
                </p>
                <p>
                  <MDBIcon icon="print" className="me-3" /> + 01 234 567 89
                </p>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </section>

        <div
          className="text-center p-4"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
        >
          © 2021 Copyright:
          <a className="text-reset fw-bold" href="https://mdbootstrap.com/">
            MDBootstrap.com
          </a>
        </div>
      </MDBFooter>
    </div>
  );
}

export default App;
