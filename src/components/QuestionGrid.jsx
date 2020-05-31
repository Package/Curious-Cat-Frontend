import React from 'react'
import {formatUsername} from "../utils";
import Moment from "react-moment";

export const QuestionGrid = ({ questions }) => {

    /**
     * Returns only the questions where an answer has been provided
     * @returns {*}
     */
    const answeredQuestionsOnly = () => {
        return questions.filter(q => q.answer_label !== null);
    }

    const actualQuestions = answeredQuestionsOnly();

    if (actualQuestions.length === 0) {
        return <p><em>This user has not answered any questions yet.</em></p>
    }

    return (
        <React.Fragment>
            {actualQuestions.map((t, i) => (
                <div key={i} className="question">
                    <strong>{t.question_label}</strong>
                    <p><small className="text-muted">{formatUsername(t.from_user_name)} <Moment fromNow date={t.question_timestamp}/></small></p>
                    <p>
                        {t.answer_label}
                    </p>
                </div>
            ))}
        </React.Fragment>
    )
}
