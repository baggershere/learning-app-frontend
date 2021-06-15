import React from "react";
import { shallow, configure } from "enzyme";
import Navbar from "./Navbar";
import Adapter from "enzyme-adapter-react-16";
import { testStore } from "./utils/testingutils";
import * as redux from "react-redux";
import App from "../App";

configure({ adapter: new Adapter() });

const setUp = (initialState = {}) => {
  const store = testStore(initialState);
  const wrapper = shallow(<App store={store} />);
  return wrapper;
};
