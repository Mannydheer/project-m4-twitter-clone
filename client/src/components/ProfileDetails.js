import React from 'react'
import UserFollowUnfollow from './UserFollowUnfollow';
import { Link } from 'react-router-dom';
import styled from 'styled-components';



const ProfileDetails = ({ selectedUser, path }) => {
    return (
        <Profile>
            {/* USER INFO DIV. */}
            <UserInfo>
                <Banner src={selectedUser.bannerSrc} />
                <UserImg src={selectedUser.avatarSrc} />
                <FlexFollow>
                    <UserFollowUnfollow selectedUser={selectedUser}></UserFollowUnfollow>
                </FlexFollow>
                <Name>{selectedUser.displayName}</Name>
                <Handle>@{selectedUser.handle} - {selectedUser.isFollowingYou && <FollowsYou> Follows you</FollowsYou>}</Handle>
                <Bio>{selectedUser.bio}</Bio>
                <Link to={`/${path}/followers`}>{selectedUser.numFollowers} <strong> Followers</strong></Link>
                <Link to={`/${path}/following`}>{selectedUser.numFollowing} <strong>Following </strong></Link>
            </UserInfo>
        </Profile>
    )
}

export default ProfileDetails;

const Profile = styled.div`
width: 80%;
margin: 0 auto;
font-size:1.1rem;
@media screen and (max-width: 768px) {
width: 100%;
margin: 0;
}
`

const Name = styled.div`
font-weight: bold;
font-size: 1.2em;
padding: 10px 0 10px 0;
`
const Bio = styled.div`

padding: 10px 0 10px 0;
`
const Handle = styled.div`
color: white;
`
const FollowsYou = styled.span`
background-color: lightgray;
border-radius: 10px;
padding: 5px;
color: black;
`
const Banner = styled.img`
width: 100%;
`
const UserImg = styled.img`

width: 10vw;
height: 20vh;
border-radius: 50%;
@media screen and (max-width: 768px) {
width: 30vw;
}



`

const UserInfo = styled.div`
width: 100%;
font-size: 1.1em;
padding-bottom: 1rem;
border-left: solid 1px white;
border-right: solid 1px white;
a{
    text-decoration: none;
    padding-right: 20px;
    color: black;
    background-color: lightgray;
    border-radius: 10px;
    padding: 5px;
    margin: 10px;

    :hover {
        color: black;
        transition: 0.5s all ease;
        opacity: 0.7;
        cursor: pointer;
    }
}

`
const FlexFollow = styled.div`
display: flex;
justify-content: flex-end;
padding-right: 20px;
background-color: transparent;
border: solid 1px gray;
`
