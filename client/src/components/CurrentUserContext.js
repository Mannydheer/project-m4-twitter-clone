import React, { useContext, useState, useEffect } from 'react';
import { createContext } from 'react';


export const CurrentUserContext = createContext();

const InitialState = {
    currentUser: null,
    isLoaded: false,
    status: null,

}

const reducer = (state, action) => {
    // switch (key) {
    //     case value:

    //         break;

    //     default:
    //         break;
    // }
}


const CurrentUserProvider = ({ children }) => {

    const [state, dispatch] = React.useReducer(reducer, InitialState)


    const updateProfileUser = (userInfo) => {
        dispatch({
            type: 'update-user-info',
            ...userInfo,
        })

    }

    useEffect(() => {

        const getUserData = async () => {
            let userResponse = await fetch('/api/me/profile',
                {
                    method: "get",
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json',
                    },
                })

            let info = await userResponse.json();
            console.log(info)
        }

        // const getUserData = () => {
        //     fetch('api/me/profile', {
        //         method: "get",
        //         headers: {
        //             'Accept': 'application/json',
        //             'Content-type': 'application/json',
        //         },
        //     })
        //         .then(data => {
        //             return (data.json())
        //         })
        //         .then(userInfo => {
        //             console.log(userInfo)
        //         })

        // }

        //perform fetch function above. 
        getUserData();

        // fetch('http://localhost:31415/api/me/profile', {
        //     method: "get",
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-type': 'application/json'
        //     },
        // })



        //on component MOUNT only. One render. 
    }, [])







    //compoment on Load...Fetch with React.useEffect. 
    //onLoad can call a function that will dispatch to the updated State.
    //compoenent can be called in the Useeffect.





    return (
        <CurrentUserContext.Provider>
            {children}

        </CurrentUserContext.Provider>

    )






}

export default CurrentUserProvider;