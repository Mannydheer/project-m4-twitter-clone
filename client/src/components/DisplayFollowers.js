import React, { useState } from 'react';
import { CurrentUserContext } from './CurrentUserContext';
import styled from 'styled-components';
import UserFollowUnfollow from './UserFollowUnfollow';




const DisplayFollowers = ({ eachUser }) => {
    //each user has all the followers/following users
    console.log(eachUser, 'each usererrr')
    return (<DisplayBody>
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
    )

}


export default DisplayFollowers;



const DisplayBody = styled.div`
width: 50%;
display: flex;
margin: 0 auto;
border: solid 1px gray;
@media screen and (max-width: 768px) {
display: block;
width: 100%;
}





`
const StyledHandle = styled.div`
color: gray;
`
const StyledText = styled.div`
padding: 10px;
width: 100%;

`

const ImageAuthor = styled.img`
border-radius: 50%;
width: 100px,;
height: 100px;
padding: 10px;
`