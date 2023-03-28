import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
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

  const todosData = useSelector(todosSelectorForData); // Notice here, we got the todos data, instead of setting up a 'mapStateToProps' and 'mapDispatchToProps' for this
  const todosIsLoading = useSelector(todosSelectorForisLoading);
  return todosIsLoading ? (
    <div>Loading...</div>
  ) : (
    <div className="list-wrapper">
      <NewTodoForm todosData={todosData} />
      {todosData.map((todo) => (
        <TodoListItem todo={todo} key={todo.id} />
      ))}
    </div>
  );
};

export default TodoList;
