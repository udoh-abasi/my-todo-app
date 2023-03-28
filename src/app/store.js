import { configureStore } from "@reduxjs/toolkit";
import { todos } from "./reducers";

export const store = configureStore({
  reducer: { todos },
});
