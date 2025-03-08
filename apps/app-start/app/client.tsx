/// <reference types="vinxi/types/client" />

import { StartClient } from "@tanstack/react-start";
import ReactDOM from "react-dom/client";

import { createRouter } from "./router";

const router = createRouter();

ReactDOM.hydrateRoot(document, <StartClient router={router} />);
