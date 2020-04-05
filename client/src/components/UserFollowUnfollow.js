import React, { useState } from 'react';
import styled from 'styled-components';
import { COLORS } from '../constants';






const UserFollowUnfollow = ({ selectedUser }) => {

    console.log(selectedUser, 'WHAT IS IN SELECTED USER')

    //reuse a state within this scope... same as DisplayFollowers. 
    const [selectedUserState, setSelectedUserState] = useState(selectedUser)


    const handleFollowerPut = () => {
        handleUpdateFollow();
    }
    const handleUpdateFollow = async () => {
        //fetch to check for follows.
        let followResponse = await fetch(`/api/${selectedUserState.handle}/follow`, {
            method: 'PUT',
        })
        if (followResponse.status === 200) {
            console.log('follow success')
            //change users key to FOLLOWING
            setSelectedUserState({
                ...selectedUserState,
                isBeingFollowedByYou: true
            })
        }
        //if you are already following
        if (followResponse.status === 409) {
            let unfollowResponse = await fetch(`/api/${selectedUserState.handle}/unfollow`, {
                method: 'PUT',
            })
            console.log('unfollow success')
            //change users key to UNFOLLOW
            setSelectedUserState({
                ...selectedUserState,
                isBeingFollowedByYou: false
            })
        }
    }




    return (
        <div>
            {selectedUserState.isBeingFollowedByYou ? <Btn style={{ backgroundColor: `${COLORS.buttons}`, color: 'white' }} onClick={handleFollowerPut}>Following</Btn> :
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



` 