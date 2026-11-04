import { renderToString } from "react-dom/server";
import App from "./App.jsx";
export { SERVICES } from "./components/Services.jsx";
export { PHONE, INSTAGRAM } from "./lib/gsap";

export const render = () => renderToString(<App />);
