import { applyMiddleware, createStore } from "redux";
import rootReducer from "../../redux/rootReducer";
import { middlewares } from "./createStore";

export const testStore = (initialState) => {
  const createStoreWithMiddleware = applyMiddleware(...middlewares)(
    createStore
  );
  return createStoreWithMiddleware(rootReducer, initialState);
};
