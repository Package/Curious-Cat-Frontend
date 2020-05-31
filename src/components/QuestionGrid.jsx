import React from 'react'
import {formatUsername} from "../utils";
import Moment from "react-moment";
import {ProfileInitials} from "./ProfileInitials";
import {Link} from "react-router-dom";

export const QuestionGrid = ({ questions }) => {

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
                        <ProfileInitials username={formatUsername(t.from_user_name)} />
                        <Link to={`/profile/${t.from_user}`}>
                            {formatUsername(t.from_user_name)}
                        </Link>
                        <small className="timestamp"><Moment fromNow date={t.question_timestamp} /></small>
                        <p className="label">{t.question_label}</p>
                    </div>

                    <div className="question--answer">
                        <ProfileInitials username={formatUsername(t.target_user_name)} />
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
