import React, {useState} from 'react';
import Axios from "axios";
import {buildHeader} from "../auth";
import {FlashMessage} from "./FlashMessage";

export const AskQuestion = ({userId}) => {

    const [question, setQuestion] = useState('');
    const [anonymous, setAnonymous] = useState(false);
    const [success, setSuccess] = useState('')
    const [error, setError] = useState('')

    /**
     * Handles asking a question.
     *
     * @param e
     * @returns {boolean}
     */
    const askQuestion = (e) => {
        e.preventDefault()

        if (question.length === 0) {
            setError('Please enter something to ask!');
            return false;
        }

        Axios({
            method: 'post',
            url: '/api/question.php',
            data: {
                "label": question,
                "target_user": userId,
                "name_hidden": anonymous
            },
            headers: buildHeader()
        }).then(_ => {
            setSuccess('Your question has been asked.');
            setError('');
            setQuestion('');
        }).catch(err => setError(err.response.data.message))
    }

    return (
        <div className="questionForm mb-4">
            <FlashMessage type="success" message={success}/>
            <FlashMessage type="error" message={error}/>

            <form onSubmit={askQuestion}>
                <div className="form-group">
                    <textarea className="form-control" id="question" rows="3" placeholder="Ask a question..." value={question} onChange={(e) => setQuestion(e.target.value)}/>
                </div>
                <div className="form-check mb-2">
                    <input type="checkbox" className="form-check-input" id="anonymous" value={anonymous} onChange={(e) => setAnonymous(e.target.checked)}/>
                    <label className="form-check-label" htmlFor="exampleCheck1">Ask Anonymously</label>
                </div>
                <button type="submit" className="btn btn-primary">Ask Question</button>
            </form>
        </div>
    );
};
