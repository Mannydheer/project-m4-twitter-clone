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
        case 'update-likes': {
            console.log(action, 'ACTION')
            if (action.liked) {
                state.currentUser.numLikes += 1;
            }
            // else if (action.liked === false) {
            //     state.currentUser.numLikes -= 1;
            // }
            return {
                ...state,
            }
        }

        //add error
        default:
    }
}

const CurrentUserProvider = ({ children }) => {

    const [state, dispatch] = React.useReducer(reducer, InitialState)

    console.log(state, 'STATE')
    //dispatcher Functions.
    const updateProfileUser = (userInfo) => {
        dispatch({
            type: 'update-user-info',
            ...userInfo, // double check copy here. 
        })

    }
    const updateLikes = (liked) => {
        dispatch({
            type: 'update-likes',
            ...liked
        })

    }


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
            updateLikes

        }}>
            {children}

        </CurrentUserContext.Provider>

    )






}

export default CurrentUserProvider;