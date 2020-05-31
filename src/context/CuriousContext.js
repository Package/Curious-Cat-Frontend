import React, { createContext } from 'react';

export const CuriousContext = createContext()

export const CuriousProvider = (props) => {

    // Any state management can be done here.
    // ...

    return (
        <CuriousContext.Provider value={{ message: "Hello World" }}>
            {props.children}
        </CuriousContext.Provider>
    )
}

