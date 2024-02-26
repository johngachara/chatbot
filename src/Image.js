import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { GoogleGenerativeAI } from "@google/generative-ai";

export default function Image() {
    const [input, setInput] = useState('' );
    const [inputName, setInputName] = useState("");
    const [data, setData] = useState(null);
    const [error, setError] = useState("");
    const ref = useRef(null);
    const genAI = new GoogleGenerativeAI(
        ""
    );
    const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });

    async function fileToGenerativePart(file) {
        const base64EncodedDataPromise = new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result.split(',')[1]);
            reader.readAsDataURL(file);
        });

        return {
            inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
        };
    }
    async function aiImageRun() {
        const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
        const result = await model.generateContent([
            "What's in this photo?", imageInineData
        ]);
        const response = await result.response;
        const text = response.text();
    }





    function Navbar() {
        return (
            <div className="container">
                <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
                    <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
                        <li>
                            <Link to="/" className="nav-link px-2 link-primary">
                                Chat With Gemini
                            </Link>
                        </li>
                        <li>
                            <Link to="/picture" className="nav-link px-2 link-primary">
                                Chat with Gemini Pro
                            </Link>
                        </li>
                    </ul>
                </header>
            </div>
        );
    }

    return (
        <div className="container">
            <Navbar />
            <h3>Gemini Pro Vision</h3>
            {inputName ? (
                <div>
                    <h5>Selected Files:</h5>
                    <ul>
                        <img src={input} alt={inputName}></img>
                    </ul>
                    <button onClick={submit}>Ask</button>
                </div>
            ) : (
                <div>
                    <label htmlFor="fileInput" className="form-label">
                        Select Pictures
                    </label>
                    <input
                        ref={ref}
                        type="file"
                        className="form-control"
                        id="fileInput"
                        onChange={handleFileChange}
                    />
                </div>
            )}
            <div className="mb-3"></div>
        </div>
    );
}
