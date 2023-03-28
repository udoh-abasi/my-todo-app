import { createAction } from "@reduxjs/toolkit";

export const loadTodosAction = createAction(
  "LOAD_TODOS",
  function prepare(todo) {
    return {
      payload: {
        todo,
      },
    };
  }
);

export const createTodosAction = createAction("CREATE_NEW_TODOS", (todo) => {
  return {
    payload: { newTodo: todo },
  };
});

export const completeTodoAction = createAction(
  "TODOS_COMPLETE",
  (completedTodo) => ({
    payload: { completedTodo },
  })
);

export const removeTodoAction = createAction("REMOVE_TODO", (removedTodo) => ({
  payload: { removedTodo },
}));

export const loadTodoInProgress = createAction("LOAD_TODOS_PROGRESS");

export const loadTodosSuccess = createAction("LOAD_TODOS_SUCCESS");

export const loadTodosFailure = createAction("LOAD_TODOS_FAILURE");
