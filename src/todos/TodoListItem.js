import { useDispatch } from "react-redux";
import { completeTodoThunk, removeTodoThunk } from "../app/thunks";
import "./TodoListItem.css";
import styled from "styled-components";

const BorderButtom = styled.div`
  border-radius: 8px;
  border-bottom: ${(props) =>
    new Date(props.todo.createdAt) < new Date(Date.now() - 86400000)
      ? "3px solid red"
      : "none"};
`;

const NoBorderButtom = styled.div``;

const TodoListItem = ({ todo }) => {
  const dispatch = useDispatch();

  const Container = todo.isCompleted ? NoBorderButtom : BorderButtom;

  return (
    <Container todo={todo}>
      <div className="todo-item-container">
        <h3>{todo.text}</h3>
        <time dateTime={todo.createdAt}>
          Created at&nbsp;{new Date(todo.createdAt).toLocaleDateString()}
        </time>
        <div className="buttons-container">
          {!todo.isCompleted && (
            <button
              className="completed-button"
              onClick={() => dispatch(completeTodoThunk(todo.id))}
            >
              Mark As Completed
            </button>
          )}
          <button
            className="remove-button"
            onClick={() => dispatch(removeTodoThunk(todo.id))}
          >
            Remove
          </button>
        </div>
      </div>
    </Container>
  );
};

export default TodoListItem;
