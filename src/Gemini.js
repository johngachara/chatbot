import {useEffect, useRef, useState} from "react";
import {GoogleGenerativeAI} from "@google/generative-ai";
import VanillaTilt from "vanilla-tilt";
import {Link} from "react-router-dom";



export default function Gemini() {
    const [input,setInput] = useState('')
    const [data ,setData] = useState(null)
    const [error,setError] = useState('')
    const tiltRef = useRef()
    const [message,setMessage] = useState('Hello, how can I help you?')
    useEffect(()=>{
        const tiltNode = tiltRef.current
        VanillaTilt.init(tiltNode,{max:20,speed:400})
    },[])


    function handleChange(event) {
        setInput(event.target.value.toLowerCase())
    }
    async function handleSubmit(event) {
        event.preventDefault()
        try {
            const genAI = new GoogleGenerativeAI('');
            const model = genAI.getGenerativeModel({model: 'gemini-pro'})
            const chat = model.startChat({history: []})
            const result = await chat.sendMessage(input)
            const response = await result.response
            setData(response.text())
            setError('')
            setInput('')
        }catch (e) {
            setData(null)
            setError('Error from gemini')
        }
    }
    function Navbar() {
        return <div className="container">
            <header
                className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">

                <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
                    <li><Link to="/" className="nav-link px-2 link-primary">Chat With Gemini</Link></li>
                    <li><Link to="/picture" className="nav-link px-2 link-primary">Chat with Gemini Pro</Link></li>

                </ul>
            </header>
        </div>
    }

    return (
        <div>
            <Navbar />
        <div ref={tiltRef} className="container my-5">
                <div className="bg-light p-5 rounded">
                    <div className="col-sm-8 py-5 mx-auto">
                        <h1 className="display-5 fw-normal">🤖 Gemini </h1>
                        <p className="fs-5">{error ? `Error: ${error}` : (data ? data : message )} </p>
                </div>
            </div>
        </div>
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="input-group mb-3">
                        <form onSubmit={handleSubmit}>
                        <label htmlFor="gem"> </label>
                        <input onChange={handleChange} value={input} type="text" id="gem" className="form-control"/>
                        <button onClick={()=>{setMessage('...')
                        setData(null)}} style={{marginTop:10}} className="btn btn-primary" type="submit"
                                id="button-addon2">Send
                        </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>)
}
