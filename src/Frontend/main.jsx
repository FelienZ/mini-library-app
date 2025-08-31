import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./App.css"
import BookManager from "./Components/BookManager";

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BookManager/>
    </StrictMode>
)