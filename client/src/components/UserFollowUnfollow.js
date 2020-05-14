import React, { useState } from 'react';
import styled from 'styled-components';
import { COLORS } from '../constants';
import { CurrentUserContext } from './CurrentUserContext';
// import { TweetHomeContext } from './TweetHomeContext';






const UserFollowUnfollow = ({ selectedUser }) => {

    const { updateFollow } = React.useContext(CurrentUserContext)
    // const { handleUpdateFeed } = React.useContext(TweetHomeContext)
    //reuse a state within this scope... same as DisplayFollowers. 
    const [selectedUserState, setSelectedUserState] = useState(selectedUser)


    const handleFollowerPut = () => {
        handleUpdateFollow();
    }


    const handleUpdateFollow = async () => {

        //fetch to check for follows.
        let followResponse = await fetch(`https://twitter-clone-bootcamp.herokuapp.com/api/${selectedUserState.handle}/follow`, {
            method: 'PUT',
        })
        if (followResponse.status === 200) {
            // let fetchTweets = await fetch('/api/me/home-feed')
            // console.log(fetchTweets)
            // let allTweets = await fetchTweets.json()
            //dispatch to reducer to load all homefeed tweets
            // handleUpdateFeed(allTweets)
            //change users key to FOLLOWING
            setSelectedUserState({
                ...selectedUserState,
                isBeingFollowedByYou: true
            })
            //increment the # of followers... current user has
            updateFollow({
                isBeingFollowedByYou: true
            })
        }
        //if you are already following
        if (followResponse.status === 409) {
            await fetch(`https://twitter-clone-bootcamp.herokuapp.com/api/${selectedUserState.handle}/unfollow`, {
                method: 'PUT',
            })
            // let fetchTweets = await fetch('/api/me/home-feed')
            // console.log(fetchTweets)
            // let allTweets = await fetchTweets.json()
            //dispatch to reducer to load all homefeed tweets
            // handleUpdateFeed(allTweets)
            //change users key to UNFOLLOW
            setSelectedUserState({
                ...selectedUserState,
                isBeingFollowedByYou: false
            })
            updateFollow({
                isBeingFollowedByYou: false
            })
        }
    }
    return (
        <div>
            {selectedUserState.isBeingFollowedByYou ?
                <Btn style={{ backgroundColor: `${COLORS.buttons}`, color: 'white' }} onClick={handleFollowerPut}>Following</Btn>
                :
                <Btn onClick={handleFollowerPut}>Follow</Btn>}
        </div>
    )
}


export default UserFollowUnfollow;

const Btn = styled.button`
font-size: 24px;
padding: 10px;
cursor: pointer;
border-radius: 25px;
outline: none;
color: black;

@media only screen and (max-width: 450px) {
background-color: white;
outline: none;
}




` 