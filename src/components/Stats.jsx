import React, {useEffect, useState} from 'react';
import Axios from "axios";
import {buildHeader} from "../auth";
import {StatBlock} from "./StatBlock";
import {Loading} from "./Loading";

export const Stats = () => {

    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [newest, setNewest] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (loading) {
            Axios({
                method: 'get',
                url: '/api/stats.php',
                headers: buildHeader()
            }).then(res => {
                console.log(res.data)
                setQuestions(res.data.questions);
                setAnswers(res.data.answers);
                setNewest(res.data.newest);
                setLoading(false);
            }).catch(err => console.error(err));
        }
    }, [loading])

    if (loading) {
        return <Loading/>
    }

    return (
        <React.Fragment>
            <StatBlock data={newest} title="Newest Members"/>
            <StatBlock data={questions} title="Most Questions"/>
            <StatBlock data={answers} title="Most Answers"/>
        </React.Fragment>
    );
};
