import {useEffect, useState} from "react";
import Axios from "axios";
import {buildHeader} from "../auth";

const useQuestion = (questionId) => {
    const [question, setQuestion] = useState({})

    useEffect(() => {
        if (questionId !== undefined && questionId > 0) {
            Axios({
                method: 'get',
                url: `/api/question.php?id=${questionId}`,
                headers: buildHeader()
            }).then(res => {
                setQuestion(res.data[0]);
            }).catch(err => console.error((err)));
        }
    }, [questionId])

    return question;
}

export default useQuestion;