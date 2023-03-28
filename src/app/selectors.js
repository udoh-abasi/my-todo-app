import { createSelector } from "@reduxjs/toolkit"; // NOTE: Notice How we imported 'createSelector' from "@reduxjs/toolkit", instead of from 'redux'

export const todosSelectorForData = (state) => state.todos.data;

export const todosSelectorForisLoading = (state) => state.todos.isLoading;

export const completeTodosSelector = createSelector(
  todosSelectorForData,
  (todos) => todos.filter((todo) => todo.isCompleted)
);

export const inCompleteTodosSelector = createSelector(
  todosSelectorForData,
  (todos) => todos.filter((todo) => !todo.isCompleted)
);
