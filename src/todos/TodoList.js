import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  completeTodosSelector,
  inCompleteTodosSelector,
  todosSelectorForData,
  todosSelectorForisLoading,
} from "../app/selectors";
import { loadTodoThunk } from "../app/thunks";
import NewTodoForm from "./NewTodoForm";
import TodoListItem from "./TodoListItem";
import "./TodoList.css";

const TodoList = () => {
  const dispatch = useDispatch();

  //const onDispatchThunk = () => dispatch(loadTodoThunk());        // NOTE: We can either define a function like this, and use it in the 'useEffect'

  // NOTE: But this is the approved way to do it. So, we used a 'useCallback' hook, and put our function there
  const onDispatchThunk = useCallback(() => {
    dispatch(loadTodoThunk());
  }, [dispatch]);

  // NOTE: Since we cannot call 'useDispatch' inside 'useEffect', we set up the 'useCallback' above, to dispatch our thunk.
  useEffect(() => {
    onDispatchThunk();
  }, [onDispatchThunk]);

  const todosData = useSelector(todosSelectorForData);
  const incompleteTodosData = useSelector(inCompleteTodosSelector); // Notice here, we got the todos data, instead of setting up a 'mapStateToProps' and 'mapDispatchToProps' for this
  const completeTodosData = useSelector(completeTodosSelector);
  const todosIsLoading = useSelector(todosSelectorForisLoading);

  return todosIsLoading ? (
    <div>Loading...</div>
  ) : (
    <div className="list-wrapper">
      <NewTodoForm todosData={todosData} />
      <h2>Incomplete Todos</h2>
      {incompleteTodosData.map((todo) => (
        <TodoListItem todo={todo} key={todo.id} />
      ))}
      <h2>Completed Todos</h2>
      {completeTodosData.map((todo) => (
        <TodoListItem todo={todo} key={todo.id} />
      ))}
    </div>
  );
};

export default TodoList;
