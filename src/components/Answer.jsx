import React, {useState} from 'react';
import {useParams} from 'react-router-dom';
import Axios from "axios";
import {buildHeader} from "../auth";
import {formatUsername, objectIsEmpty} from "../utils";
import useQuestion from "../hooks/useQuestion";
import {Loading} from "./Loading";
import {FlashMessage} from "./FlashMessage";
import { Redirect } from 'react-router-dom';
import Moment from "react-moment";

export const Answer = () => {

    const {questionId} = useParams();
    const question = useQuestion(questionId)

    const [answerLabel, setAnswerLabel] = useState('');
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    /**
     * Handles adding an answer
     */
    const onSubmit = (e) => {
        e.preventDefault();

        if (answerLabel.length > 0) {
            Axios({
                method: 'post',
                url: `/api/answer.php`,
                data: {
                    "question_id": questionId,
                    "label": answerLabel
                },
                headers: buildHeader()
            }).then(res => {
                setError('')
                setSuccess('Your answer has been sent.');
            }).catch(err => setError(err.response.data.message));
        }
    }

    if (objectIsEmpty(question)) {
        return <Loading/>
    }

    return (
        <div>
            <FlashMessage type="success" message={success} />
            <FlashMessage type="error" message={error} />

            {success.length > 0 && <Redirect to="/notifications"/>}

            <h2>{question.label}</h2>
            <p className="text-muted">{formatUsername(question.from_username)} <Moment fromNow date={question.created_at} /></p>

            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <textarea className="form-control" rows="3" id="label" name="label" value={answerLabel} onChange={(e) => setAnswerLabel(e.target.value)} placeholder="Add your answer"/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
};
