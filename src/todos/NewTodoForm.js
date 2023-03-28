import { useRef } from "react";
import { useDispatch } from "react-redux";
import { createTodosThunk } from "../app/thunks";
import "./NewTodoForm.css";

const NewTodoForm = ({ todosData }) => {
  const inputRef = useRef();

  const dispatch = useDispatch();

  const creatTodoButtonClick = () => {
    const inputValue = inputRef.current.value;

    const isDuplicate = todosData.some(
      (todo) => todo.text.toLowerCase() === inputValue.toLowerCase()
    );

    inputValue &&
      inputValue.trim().length &&
      !isDuplicate &&
      dispatch(createTodosThunk(inputValue));
    inputRef.current.value = "";
  };

  return (
    <div className="new-todo-form">
      <input
        type="text"
        className="new-todo-input"
        ref={inputRef}
        placeholder="Type your new todo here"
      />
      <button className="new-todo-button" onClick={creatTodoButtonClick}>
        Create Todo
      </button>
    </div>
  );
};

export default NewTodoForm;
