import React, {useEffect, useState} from 'react'
import {Loading} from "./Loading";
import Axios from "axios";
import {buildHeader} from "../auth";
import {QuestionGrid} from "./QuestionGrid";

export const Home = () => {

    const [timeline, setTimeline] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (loading) {
            Axios({
                method: 'get',
                url: '/api/timeline.php',
                headers: buildHeader()
            }).then(res => {
                setTimeline(res.data);
                setLoading(false);
            }).catch(err => console.error(err));
        }
    }, [loading])

    if (loading) {
        return <Loading/>
    }

    if (timeline.length === 0) {
        return <p><em>Nothing to see here...</em></p>
    }

    return (
        <React.Fragment>
            <h2>Your Timeline</h2>
            <QuestionGrid questions={timeline}/>
        </React.Fragment>
    )
}
