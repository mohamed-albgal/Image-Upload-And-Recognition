import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { getCategory, getItems } from "./APIFunctions";

var assert = require("assert");

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("returns all categories", async () => {
  let x = await getCategory();
  assert(x.length == 15);
});

it("returns all items", async () => {
  let x = await getItems();
  assert(x.length == 15);
});

it("returns all items in a category", async () => {
  let x = await getCategory(1);
  assert(x.length == 1);
});