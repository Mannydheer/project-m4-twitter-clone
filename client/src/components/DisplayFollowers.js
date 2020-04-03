import React, { useState } from 'react';
import HandleFollow from './HandleFollow';
import { CurrentUserContext } from './CurrentUserContext';
import styled from 'styled-components';




const DisplayFollowers = ({ eachUser }) => {
    //each user has all the followers/following users
    const { updateFollow } = React.useContext(CurrentUserContext)
    const [followUnfollow, setFollowUnfollow] = useState(false)


    // console.log(eachUser)



    const handleFollowerPut = () => {
        handleUpdateFollow();
    }

    const handleUpdateFollow = async () => {

        //fetch to check for follows.
        let followResponse = await fetch(`/api/${eachUser.handle}/follow`, {
            method: 'PUT',
        })

        if (followResponse.status === 200) {
            console.log('follow success')
            //change users key to FOLLOWING
            eachUser.isBeingFollowedByYou = true;
            updateFollow({
                //following
                follow: true
            })
        }

        //if you are already following
        if (followResponse.status === 409) {
            let unfollowResponse = await fetch(`/api/${eachUser.handle}/unfollow`, {
                method: 'PUT',
            })
            console.log('unfollow success')
            //change users key to UNFOLLOW
            eachUser.isBeingFollowedByYou = false;
            updateFollow({
                //unfollowing
                follow: false
            })

        }



    }







    return (

        <React.Fragment>

            <div>Profile Image<img src={eachUser.avatarSrc}></img></div>
            <div> Name: {eachUser.displayName}</div>
            <div>Name: {eachUser.handle}</div>
            <div>@{eachUser.handle}</div>
            <div>Bio: {eachUser.bio}</div>
            {/* add logic follow button */}
            {eachUser.isBeingFollowedByYou ? <Btn style={{ backgroundColor: 'green' }} onClick={handleFollowerPut}>Following</Btn> :
                <Btn style={{ backgroundColor: 'purple' }} onClick={handleFollowerPut}>Follow</Btn>}

        </React.Fragment>

    )

}


export default DisplayFollowers;

const Btn = styled.button`
font-size: 24px;
padding: 10px;
cursor: pointer;

` 