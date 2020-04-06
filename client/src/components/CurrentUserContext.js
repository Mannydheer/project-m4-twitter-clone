import React, { useContext, useState, useEffect } from 'react';
import { createContext } from 'react';
import Error from './Error';



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
            if (action.liked) {
                state.currentUser.numLikes += 1;
            }
            else if (action.liked === false) {
                state.currentUser.numLikes -= 1;
            }
            return {
                ...state,
            }
        }
        case 'update-follow': {
            console.log(action, 'INSIDE UPDAT FOLOW')
            if (action.isBeingFollowedByYou) {
                state.currentUser.numFollowing += 1;
            }
            else if (action.isBeingFollowedByYou === false) {
                state.currentUser.numFollowing -= 1;
            }
            return {
                ...state,
            }
        }
        default:
    }
}
const CurrentUserProvider = ({ children }) => {

    const [state, dispatch] = React.useReducer(reducer, InitialState)
    const [error, setError] = useState(false);
    //dispatcher Functions.
    const updateProfileUser = (userInfo) => {
        dispatch({
            type: 'update-user-info',
            ...userInfo, // double check copy here. 
        })
    }
    const updateLikes = (liked) => {
        // dispatch({
        //     type: 'update-likes',
        //     ...liked
        // })
    }
    const updateFollow = (follow) => {

        console.log(follow, 'FOLLOW')
        dispatch({
            type: 'update-follow',
            ...follow
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
            else {
                setError(true)
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
            updateLikes,
            updateFollow

        }}>
            {children}
            {error && <Error></Error>}

        </CurrentUserContext.Provider>

    )






}

export default CurrentUserProvider;