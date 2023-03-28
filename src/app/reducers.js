import { createReducer } from "@reduxjs/toolkit";
import {
  completeTodoAction,
  createTodosAction,
  loadTodoInProgress,
  loadTodosAction,
  loadTodosFailure,
  loadTodosSuccess,
  removeTodoAction,
} from "./actions";

const initialState = { isLoading: true, data: [] };

export const todos = createReducer(initialState, (builder) => {
  builder
    .addCase(loadTodosAction, (state, action) => {
      const { payload } = action;
      const { todo } = payload;
      return { isLoading: false, data: todo };
    })
    .addCase(loadTodoInProgress, (state) => ({
      ...state,
      isLoading: true,
    }))
    .addCase(loadTodosSuccess, (state) => ({
      ...state,
      isLoading: false,
    }))
    .addCase(loadTodosFailure, (state) => ({
      ...state,
      isLoading: false,
    }))
    .addCase(createTodosAction, (state, action) => {
      const { payload } = action;
      const { newTodo } = payload;
      return { ...state, data: state.data.concat(newTodo) };
    })
    .addCase(completeTodoAction, (state, action) => {
      const { payload } = action;
      const { completedTodo } = payload;
      return {
        ...state,
        data: state.data.map((todo) =>
          todo.id === completedTodo.id ? completedTodo : todo
        ),
      };
    })
    .addCase(removeTodoAction, (state, action) => {
      const { payload } = action;
      const { removedTodo } = payload;
      return {
        ...state,
        data: state.data.filter((todo) => todo.id !== removedTodo.id),
      };
    });
});
