import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { GoogleGenerativeAI } from "@google/generative-ai";

export default function Page2() {
    const [input, setInput] = useState(File | null);
    const [inputName, setInputName] = useState("");
    const [data, setData] = useState(null);
    const [prompt,setPrompt] = useState('')
    const[error,setError] = useState('')
    const ref = useRef();
    const genAI = new GoogleGenerativeAI(
        ""
    );


    function handleFileChange(event) {
        const file = event.target.files[0]
        if(file && (file.name.toLowerCase().endsWith('.png') || file.name.toLowerCase().endsWith('.jpg'))){
            setInput(file);
            setInputName(file.name);
        }
        else{
            setError('Please upload a Picture')
        }

    }
    function handleSubmit(event) {
        event.preventDefault()
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
        async function run() {
            // For text-and-images input (multimodal), use the gemini-pro-vision model
            const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
            const fileInputEl = ref.current;
            const imageParts = await Promise.all(
                [...fileInputEl.files].map(fileToGenerativePart)
            );

            const result = await model.generateContent([prompt, ...imageParts]);
            const response = await result.response;
            const text = setData(response.text());
            console.log(text);
        }
        run()
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

            <div className="mb-3">
                <form>
                    {inputName ? (
                        <div>
                            <h5>Selected Files:</h5>
                            <ul>
                                <li>{inputName}</li>
                            </ul>
                            <label htmlFor="gemPrompt" className="form-label">
                                Ask me about the picture
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="genPrompt"
                                onChange={(event)=>{setPrompt(event.target.value)}}
                            />
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
                </form>
            </div>

            <div className="mb-3">
                <button onClick={handleSubmit}
                    className="btn btn-primary"
                >
                    Upload
                </button>
            </div>

            {/* Displaying result */}
            {data && (
                <div>
                    <h5>Generated Content:</h5>
                    <p>{data}</p>
                </div>
            )}
        </div>
    );
}
