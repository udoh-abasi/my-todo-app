import { useDispatch } from "react-redux";
import { completeTodoThunk, removeTodoThunk } from "../app/thunks";
import "./TodoListItem.css";

const TodoListItem = ({ todo }) => {
  const dispatch = useDispatch();

  return (
    <div className="todo-item-container">
      <h3>{todo.text}</h3>
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
  );
};

export default TodoListItem;
