import React from "react";
import { Provider } from "react-redux";
import store from "./src/store";

export default ({ element }) => {
  const s = store();
  return <Provider store={s}>{element}</Provider>;
};
