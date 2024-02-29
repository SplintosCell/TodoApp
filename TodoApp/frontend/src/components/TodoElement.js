import React, {useState} from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
const TodoElement = (props) => {
  const [toggleEdit, setToggleEdit] = useState(false);
  const [inputValue, setInputValue]= useState(props.todo.item)
  const [item, setItem] = useState(props.todo.item)
  const handleInputChange = (e) => {
    setInputValue(e.target.value)
  }

  const handleEditToggle = () => {
    setToggleEdit(!toggleEdit)
  }

  const save = () => {
   const id = props.todo._id;
  
   fetch("http://localhost:3001/api/todo/"+id, {method: 'PUT', body: JSON.stringify({...props.todo, item: inputValue}), headers: { "Content-Type": "application/json" }}).then((res)=> res.json()).then(response => {
    setItem(inputValue)
    setToggleEdit(false);
   })
  }
  return (
    <Container className="mt-2" >
      <Row xs="auto">
        <Col lg>
          <ListGroup as="ul">
            <ListGroup.Item
              className={`${props.todo.done ? "text-decoration-line-through" : "text-decoration-none"}`}
              as="li"
              active
            >{toggleEdit && <input value={inputValue}  onChange={handleInputChange}/>}
              {!toggleEdit && item} 
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col>
          <Button
            className="mx-auto"
            variant="success"
            onClick={handleEditToggle}
            id="button-addon2"
          >
            Edit
          </Button>
        </Col>
        <Col>
          <Button
            className="mx-auto"
            variant="success"
            onClick={save}
            id="button-addon2"
          >
            Save
          </Button>
        </Col>
        <Col>
          <Button
            className="mx-auto"
            variant="danger"
            onClick={() => props.delete(props.todo._id)}
            id="button-addon2"
          >
            Delete
          </Button>
        </Col>
        <Col>
          <Button
            className="mx-auto"
            variant="warning"
            onClick={() => props.toggle(props.todo._id)}
            id="button-addon2"
          >
            Done !{" "}
          </Button>
        </Col>
      </Row>
    </Container>

    /* end */
  );
};

export default TodoElement;
