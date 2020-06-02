import React, {useEffect, useState} from 'react'
import {Loading} from './Loading'
import Axios from 'axios'
import {buildAuthorizationHeader} from '../auth'
import {QuestionGrid} from './QuestionGrid'
import {UserGrid} from './UserGrid'
import {objectIsEmpty} from "../utils";
import {Stats} from "./Stats";

export const Search = () => {

    const [search, setSearch] = useState('')
    const [searching, setSearching] = useState(false)
    const [results, setResults] = useState({})

    useEffect(() => {
        if (searching) {
            Axios.get(`/api/search.php?query=${search}`, buildAuthorizationHeader())
                .then(res => {
                    setResults(res.data);
                    setSearching(false);
                }).catch(err => console.log(err));
        }
    }, [searching, search])


    const onSubmit = (e) => {
        e.preventDefault();

        if (search.length) {
            setSearching(true);
        }
    }

    if (searching) {
        return <Loading/>
    }

    return (
        <div className="row">
            <div className="col-md-4">
                <Stats/>
            </div>

            <div className="col-md-8">
                {!objectIsEmpty(results) && <h2>Showing Results for {results.query}</h2>}

                <form onSubmit={onSubmit} className="form-inline">
                    <label className="sr-only" htmlFor="query">Enter Search Query</label>
                    <input type="text" className="form-control mb-2 mr-sm-2" id="query" placeholder="Enter Search"
                           value={search} onChange={(e) => setSearch(e.target.value)}/>
                    <button type="submit" className="btn btn-primary mb-2">Search</button>
                </form>

                {!objectIsEmpty(results) && <React.Fragment>
                    <h4>Questions</h4>
                    <QuestionGrid questions={results.questions}/>

                    <h4>Users</h4>
                    <UserGrid users={results.users}/>
                </React.Fragment>}
            </div>
        </div>
    )
}
