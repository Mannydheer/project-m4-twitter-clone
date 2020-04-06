import React, { useState } from 'react';
import { CurrentUserContext } from './CurrentUserContext';
import styled from 'styled-components';
import UserFollowUnfollow from './UserFollowUnfollow';




const DisplayFollowers = ({ eachUser }) => {
    //each user has all the followers/following users
    console.log(eachUser, 'each usererrr')
    return (

        <React.Fragment>
            <DisplayBody>
                <div>
                    <ImageAuthor src={eachUser.avatarSrc}></ImageAuthor>
                </div>
                <StyledText>
                    <div> {eachUser.displayName}</div>
                    <StyledHandle>@{eachUser.handle}</StyledHandle>
                    <div>{eachUser.bio}</div>
                    {/* Reusable compoenent which will render the follow/unfollow button */}
                </StyledText>
                <UserFollowUnfollow selectedUser={eachUser}></UserFollowUnfollow>

            </DisplayBody>


        </React.Fragment>

    )

}


export default DisplayFollowers;



const DisplayBody = styled.div`


@media only screen and (min-width: 475px) {
    display: flex;
width: 56vw;
border: solid 1px gray;
}
@media only screen and (max-width: 450px) {

}

`
const StyledHandle = styled.div`
color: gray;
`
const StyledText = styled.div`
padding: 10px;

`

const ImageAuthor = styled.img`
border-radius: 50%;
width: 100px,;
height: 100px;
padding: 10px;
`