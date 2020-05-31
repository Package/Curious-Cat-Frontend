import React, {useState} from 'react';
import {useParams} from 'react-router-dom';
import Axios from "axios";
import {buildHeader} from "../auth";
import {formatUsername, objectIsEmpty} from "../utils";
import useQuestion from "../hooks/useQuestion";

export const Answer = () => {

    const {questionId} = useParams();
    const question = useQuestion(questionId)

    const [answerLabel, setAnswerLabel] = useState('');

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
                console.log(res);
            }).catch(err => console.error(err));
        }
    }

    return (
        <div>
            {!objectIsEmpty(question) &&
            <div>
                <h2>{question.label}</h2>
                <p className="text-muted">{formatUsername(question.from_username)} <time>{question.created_at}</time></p>
            </div>
            }

            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <textarea className="form-control" rows="3" id="label" name="label" value={answerLabel} onChange={(e) => setAnswerLabel(e.target.value)} placeholder="Add your answer"/>
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
};
