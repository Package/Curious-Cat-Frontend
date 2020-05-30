import React from 'react'

export const QuestionGrid = ({ questions }) => {

    if (questions.length === 0) {
        return <p>Nothing to see here.</p>
    }

    return (
        <div className="row">
            {questions.map((t, i) => (
                <div key={i} className="col-sm-6">
                    <div className="card bg-light mb-2">
                        <div className="card-header">
                            {t.from_user_name} <small>{t.question_timestamp}</small>
                        </div>
                        <div className="card-body">
                            <h5 className="card-title mb-2">
                                {t.question_label}
                            </h5>
                            <p className="card-text">{t.answer_label}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
