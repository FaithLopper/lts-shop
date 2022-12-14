import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
// import "antd/dist/antd.min.css";
import "./App.less"
import Utils from "./utils";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
const { isMobileDevice } = Utils;

// Global Use
// https://fontawesome.com/v5.15/how-to-use/on-the-web/using-with/react#using
library.add(fas, fab);

const isMobile = isMobileDevice();
if (!isMobile) {
  require("./components/common/desktop/appLayout/assets/styles/_index.scss");
} else {
  require("./components/common/mobile/appLayout/assets/styles/_index.scss");
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
