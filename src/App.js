import React from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Gemini from "./Gemini";


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Gemini />}/>
            </Routes>
        </Router>
    );
}

export default App;