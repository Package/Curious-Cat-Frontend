import React from 'react'
import {formatUsername} from "../utils";

export const QuestionGrid = ({ questions }) => {

    if (questions.length === 0) {
        return <p>No Questions to show.</p>
    }

    return (
        <React.Fragment>
            {questions.map((t, i) => (
                <div key={i} className="question">
                    <strong>{t.question_label}</strong>
                    <p><small className="text-muted">{formatUsername(t.from_user_name)} <time>{t.question_timestamp}</time></small></p>
                    <p>
                        {t.answer_label}
                    </p>
                </div>
            ))}
        </React.Fragment>
    )
}
