import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import Axios from "axios";
import {buildHeader} from "../auth";

export const Answer = () => {

    const {questionId} = useParams();
    const [label, setLabel] = useState('');
    const [question, setQuestion] = useState({});

    useEffect(() => {
        if (questionId !== undefined && questionId > 0) {
            Axios({
                method: 'get',
                url: `/api/question.php?id=${questionId}`,
                headers: buildHeader()
            }).then(res => {
                console.log(res.data);
                setQuestion(res.data[0]);
            }).catch(err => console.error((err)));
        }
    }, [questionId])

    /**
     * Handles adding an answer
     *
     * @param e
     */
    const onSubmit = (e) => {
        e.preventDefault();

        if (label.length > 0) {
            Axios({
                method: 'post',
                url: `/api/answer.php`,
                data: {
                    "question_id": questionId,
                    "label": label
                },
                headers: buildHeader()
            }).then(res => {
                console.log(res);
            }).catch(err => console.error(err));
        }
    }

    /**
     * Do we have a question loaded?
     * @returns {boolean}
     */
    const hasQuestion = () => {
        return Object.keys(question).length > 0;
    }

    const formatUsername = (username) => {
        return username == null ? 'Anonymous' : username;
    }

    return (
        <div>
            {hasQuestion() &&
            <div>
                <h2>{question.label}</h2>
                <p className="text-muted">{formatUsername(question.from_username)} <time>{question.created_at}</time></p>
            </div>
            }

            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <textarea className="form-control" rows="3" id="label" name="label" value={label} onChange={(e) => setLabel(e.target.value)} placeholder="Add your answer"/>
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
};
