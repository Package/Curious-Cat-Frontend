import React from 'react'
import {formatUsername} from "../utils";
import Moment from "react-moment";
import {Link} from "react-router-dom";
import {UserPhoto} from "./UserPhoto";

export const QuestionGrid = ({ questions }) => {

    const displayUsername = (t) => {
        if (t.question_name_hidden) {
            return (
                <React.Fragment>
                    {formatUsername(t.from_user_name)}
                </React.Fragment>
            )
        } else {
            return (
                <React.Fragment>
                    <Link to={`/profile/${t.from_user}`}>
                        {formatUsername(t.from_user_name)}
                    </Link>
                </React.Fragment>
            )
        }
    }

    /**
     * Returns only the questions where an answer has been provided
     */
    const answeredQuestionsOnly = () => {
        return questions.filter(q => q.answer_label !== null);
    }

    const actualQuestions = answeredQuestionsOnly();

    if (actualQuestions.length === 0) {
        return <p><em>Nothing to show.</em></p>
    }

    return (
        <React.Fragment>
            {actualQuestions.map((t, i) => (
                <div className="question" key={i}>
                    <div className="question--header">
                        <UserPhoto photoPath={t.from_user_photo}/>
                        {displayUsername(t)}
                        <small className="timestamp"><Moment fromNow date={t.question_timestamp} /></small>
                        <p className="label">{t.question_label}</p>
                    </div>

                    <div className="question--answer">
                        <UserPhoto photoPath={t.target_user_photo}/>
                        <Link to={`/profile/${t.target_user}`}>
                            {formatUsername(t.target_user_name)}
                        </Link>
                        <small className="timestamp"><Moment fromNow date={t.answer_timestamp} /></small>
                        <p className="label">{t.answer_label}</p>
                    </div>
                </div>
            ))}
        </React.Fragment>
    )
}
