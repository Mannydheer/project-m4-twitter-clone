import React, { useContext, useState, useEffect } from 'react';
import { createContext } from 'react';


export const CurrentUserContext = createContext();

const InitialState = {
    currentUser: null,
    isLoaded: false,
    status: 'loading',


}

const reducer = (state, action) => {
    switch (action.type) {
        case 'update-user-info': {

            //return the updated state. 
            return {
                ...state,
                isLoaded: true,
                status: 200,
                currentUser: action.profile

            }
        }

        //add error
        default:
    }
}

const CurrentUserProvider = ({ children }) => {

    const [state, dispatch] = React.useReducer(reducer, InitialState)
    console.log(state)


    //dispatcher Functions.
    const updateProfileUser = (userInfo) => {
        dispatch({
            type: 'update-user-info',
            ...userInfo, // double check copy here. 
        })

    }
    // const updateLike = (likes) => {
    //     console.log(likes, 'INSIDE UPDATE LIKE')
    //     dispatch({
    //         type: 'update-likes',
    //         isClicked: likes
    //     })
    // }

    //on Component Mount
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
            //if status is a success.
            if (userResponse.status === 200) {
                let info = await userResponse.json();
                updateProfileUser(info)
            }

        }
        //perform fetch function above. 
        getUserData();
        //on component MOUNT only. One render. 
    }, [])







    //compoment on Load...Fetch with React.useEffect. 
    //onLoad can call a function that will dispatch to the updated State.
    //compoenent can be called in the Useeffect.





    return (
        <CurrentUserContext.Provider value={{
            state,
        }}>
            {children}

        </CurrentUserContext.Provider>

    )






}

export default CurrentUserProvider;