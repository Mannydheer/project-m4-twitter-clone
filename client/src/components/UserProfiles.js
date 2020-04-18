import React, { useEffect, useState } from 'react';
import { useLocation, Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import UserFollowUnfollow from './UserFollowUnfollow';
import { COLORS } from '../constants';
import Tweet from '../components/Tweet';




const UserProfiles = () => {


    let history = useHistory();

    let location = useLocation().pathname.split('/')
    let path = location[2];

    const [selectedUser, setSelectedUser] = useState(null);
    //state for userTweet/Retweet fetch;
    const [userTweets, setUserTweets] = useState(null);


    //handler for userprofile
    //on mount
    //add ERROR HANDLING
    useEffect(() => {
        // handles the user profile informations.
        const handleClickedProfile = async () => {
            // console.log('GIT TRIGGERED')
            const getUserProfile = await fetch(`/api/${path}/profile`);
            const returnedProfile = await getUserProfile.json();
            setSelectedUser(returnedProfile.profile)
            //get all tweets related to profile.
        }
        //function call.
        //if its null, then followers was not clicked.Not undefined if I dont click on followers
        handleClickedProfile()
    }, [path])

    useEffect(() => {
        const getUserTweets = async () => {
            console.log(path, 'INSIDE USE EFFECT USER PROFILE')
            try {
                const response = await fetch(`/api/${path}/feed`);
                console.log(response, 'RESPONSE OF USER PROFILE')
                if (response.status === 200) {
                    const userTweets = await response.json();
                    setUserTweets(userTweets);

                    // setImageState(userTweets.tweetsById.media[0])
                }
                else {
                    //better error handling
                    throw Error('Response was not 200/success')
                }
            }
            catch (err) {
                throw Error("Error Occured getting users Tweets")
            }
        }
        getUserTweets();


    }, [path])

    console.log(userTweets, 'THIS IS USER TWEETS')


    //follow unfollow button: MaybeRefactor this to a reuse. 
    return (
        <React.Fragment>




            {selectedUser !== null && path !== null && userTweets !== null &&
                < MainUserProfile >

                    <Profile>
                        {/* follow and unfollow button */}
                        {/* follow and unfollow button */}
                        <div> <Banner src={selectedUser.bannerSrc}></Banner></div>
                        <UserImg src={selectedUser.avatarSrc}></UserImg>

                        <UserInfo>
                            <FlexFollow><UserFollowUnfollow selectedUser={selectedUser}></UserFollowUnfollow></FlexFollow>

                            <Name>{selectedUser.displayName}</Name>
                            <Handle>@{selectedUser.handle} - {selectedUser.isFollowingYou && <FollowsYou> Follows you</FollowsYou>}</Handle>
                            <Bio>{selectedUser.bio}</Bio>

                            <Link to={`/${path}/followers`}>{selectedUser.numFollowers} <strong> Followers</strong></Link>
                            <Link to={`/${path}/following`}>{selectedUser.numFollowing} <strong>Following </strong></Link>
                        </UserInfo>
                    </Profile>
                    {/* all tweets and retweets related to user.  */}
                    {userTweets !== null && <div>
                        {userTweets.tweetIds.map((eachId, index) => {
                            return (
                                <Btn type='button' onClick={() => history.push(`/tweet/${eachId}`)}>
                                    <Tweet allTweets={userTweets.tweetsById} tweetId={eachId}></Tweet>

                                </Btn>



                            )
                        })}
                    </div>}



                </MainUserProfile>}


        </React.Fragment >
    )


}

export default UserProfiles

const Btn = styled.div`
display: block;
width: 56vw;
cursor: pointer;

&:hover {
    opacity: 0.7;
}

@media only screen and (max-width: 450px) {

    width: 50vw;
}


`

const MainUserProfile = styled.div`

@media only screen and (min-width: 475px) {

    width: 56vw;
border: solid 1px gray;
color: white;
}
@media only screen and (max-width: 450px) {
    width: 100vw;
    border: solid 1px gray;
color: white;

}


`
const StyledTweetDiv = styled.div`

@media only screen and (min-width: 475px) {
    border: solid 1px gray;
padding: 10px;
line-height: 1.5;
display: flex;
}
@media only screen and (max-width: 450px) {
display: block;
line-height: 1.5;
    border: solid 1px gray;



}

`
const Profile = styled.div`

`
const TweetImage = styled.img`
border-radius: 10%;
width: 100%;
height: 500px;
`

const ImageAuthor = styled.img`
border-radius: 50%;
width: 50px,;
height: 50px;
padding: 10px;
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
color: black;

`
const FollowsYou = styled.span`

background-color: lightgray;
border-radius: 10px;
padding: 5px;



`


const Banner = styled.img`

@media only screen and (min-width: 475px) {
    width: 56vw;
height: 35vh;
}
@media only screen and (max-width: 450px) {
width: 100vw;
height: 70vw;

}
`
const UserImg = styled.img`

@media only screen and (min-width: 475px) {
    width: 10vw;
height: 20vh;
border-radius: 50%;
}
@media only screen and (max-width: 450px) {
width: 50vw;
height: 70vw;
border-radius: 50%;
}

`

const UserInfo = styled.div`

@media only screen and (min-width: 475px) {
font-size: 1.9em;
a{
    text-decoration: none;
    padding-right: 20px;
    color: black;
    background-color: lightgray;
    border-radius: 25px;
    padding: 5px;
    margin: 10px;

    :hover {
        color: black;
        transition: 0.5s all ease;
    }
}
}
@media only screen and (max-width: 450px) {
width: 100vw;
}


`
const FlexFollow = styled.div`


    @media only screen and (min-width: 475px) {
        display: flex;
justify-content: flex-end;
padding-right: 20px;

background-color: transparent;
    border: solid 1px gray;
}
@media only screen and (max-width: 450px) {
display: block;
justify-content: center;
}


`


const StyledUserDiv = styled.div`
font-weight: bold;


`




