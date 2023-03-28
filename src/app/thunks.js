import {
  completeTodoAction,
  createTodosAction,
  loadTodoInProgress,
  loadTodosAction,
  loadTodosFailure,
  loadTodosSuccess,
  removeTodoAction,
} from "./actions";

// NOTE: Here, if we use 'useDispatch', to dispatch actions inside the thunk, our code will NOT work
export const loadTodoThunk = () => async (dispatch) => {
  dispatch(loadTodoInProgress());

  try {
    await fetch(`http://localhost:8080/todos`)
      .then((response) => response.json())
      .then((data) => dispatch(loadTodosAction(data)))
      .then(() => dispatch(loadTodosSuccess()));
  } catch (error) {
    dispatch(loadTodosFailure());
    displayErrorThunk(error); // NOTE: You don't dispatch other thunks in a thunk. You just call them as is
  }
};

export const createTodosThunk = (text) => async (dispatch) => {
  const body = JSON.stringify({ text });
  try {
    await fetch(`http://localhost:8080/todos`, {
      headers: { "Content-Type": "application/json" },
      method: "post",
      body,
    })
      .then((response) => response.json())
      .then((data) => dispatch(createTodosAction(data)));
  } catch (error) {
    displayErrorThunk(error);
  }
};

export const completeTodoThunk = (todoID) => async (dispatch) => {
  try {
    await fetch(`http://localhost:8080/todos/${todoID}/completed`, {
      method: "post",
    })
      .then((response) => response.json())
      .then((data) => dispatch(completeTodoAction(data)));
  } catch (e) {
    displayErrorThunk(e);
  }
};

export const removeTodoThunk = (todoID) => async (dispatch) => {
  try {
    await fetch(`http://localhost:8080/todos/${todoID}`, { method: "delete" })
      .then((response) => response.json())
      .then((data) => dispatch(removeTodoAction(data)))
      .catch((error) => dispatch(displayErrorThunk(error)));
  } catch (e) {
    displayErrorThunk(e);
  }
};

export const displayErrorThunk = (error) => {
  alert(error);
};
