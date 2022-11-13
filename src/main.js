// import "./global.css";
import "sweetalert2/dist/sweetalert2.css";
import HMR from "@roxi/routify/hmr";
import App from "./App.svelte";

const app = HMR(App, { target: document.body }, "routify-app");

export default app;