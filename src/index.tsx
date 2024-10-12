import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import UserList from "./UserList";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <UserList />
  </React.StrictMode>
);

reportWebVitals();
