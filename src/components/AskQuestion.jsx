import React, {useState} from 'react';
import Axios from "axios";
import {buildHeader} from "../auth";

export const AskQuestion = ({userId, onQuestionAsked}) => {

    const [question, setQuestion] = useState('');
    const [anonymous, setAnonymous] = useState(false);

    /**
     * Handles asking a question.
     *
     * @param e
     * @returns {boolean}
     */
    const askQuestion = (e) => {
        e.preventDefault()

        if (question.length === 0) {
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
        }).then(res => {
            onQuestionAsked();
        }).catch(err => console.log(err))
    }

    return (
        <div className="questionForm mb-4">
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
