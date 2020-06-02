import React from 'react';
import {Stats} from "../Stats";

export const AuthenticatedLayout = (props) => (
    <div id="contentWrapper" className="container">
        <div className="row">
            <div className="col-md-4">
                <Stats/>
            </div>

            <div className="col-md-8">
                {props.children}
            </div>
        </div>
    </div>
);
