import React, { useState, useEffect } from 'react'
import { Loading } from './Loading'
import Axios from 'axios'
import { buildAuthorizationHeader } from '../auth'
import { QuestionGrid } from './QuestionGrid'
import { UserGrid } from './UserGrid'

export const Explore = () => {

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

    /**
     * Tests for whether the results object is an empty object, i.e
     * has no results.
     */
    const hasResults = () => {
        return Object.keys(results).length > 0;
    }

    if (searching) {
        return <Loading />
    }

    return (
        <>
            {hasResults() && <h3 className="display-4">Showing Results for {results.query}</h3>}

            <form onSubmit={onSubmit} className="form-inline">
                <label className="sr-only" htmlFor="query">Enter Search Query</label>
                <input type="text" className="form-control mb-2 mr-sm-2" id="query" placeholder="Enter Search" value={search} onChange={(e) => setSearch(e.target.value)} />
                <button type="submit" className="btn btn-primary mb-2">Search</button>
            </form>

            {hasResults() && <>
                <h4>Questions</h4>
                <QuestionGrid questions={results.questions} />

                <h4>Users</h4>
                <UserGrid users={results.users} />
            </>}
        </>
    )
}
