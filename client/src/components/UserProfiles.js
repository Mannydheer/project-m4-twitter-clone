import React, { useEffect, useState } from 'react';
import { useLocation, Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import UserFollowUnfollow from './UserFollowUnfollow';
import Tweet from '../components/Tweet';
import Error from './Error';
import { TweetHomeContext } from './TweetHomeContext';


const UserProfiles = () => {
    let history = useHistory();

    let location = useLocation().pathname.split('/')
    let path = location[2];
    const { tweetHomeFeedState } = React.useContext(TweetHomeContext)


    const [selectedUser, setSelectedUser] = useState(null);
    //state for userTweet/Retweet fetch;
    const [userTweets, setUserTweets] = useState(null);
    const [error, setError] = useState(false);

    //handler for userprofile
    //on mount
    //add ERROR HANDLING
    useEffect(() => {
        // handles the user profile informations.
        const handleClickedProfile = async () => {
            if (path === "treasurymog") {
                const getUserProfile = await fetch(`/api/me/profile`);
                const returnedProfile = await getUserProfile.json();
                setSelectedUser(returnedProfile.profile)
                try {

                    const response = await fetch(`/api/me/home-feed`);
                    if (response.status === 200) {
                        const userTweets = await response.json();
                        setUserTweets(userTweets);
                        // setImageState(userTweets.tweetsById.media[0])
                    }
                    else {
                        //better error handling
                        setError(true)
                        throw Error('Response was not 200/success')
                    }
                }
                catch (err) {
                    setError(true)
                    throw Error("Error Occured getting users Tweets")
                }
            }
            else {
                const getUserProfile = await fetch(`/api/${path}/profile`);
                const returnedProfile = await getUserProfile.json();
                setSelectedUser(returnedProfile.profile)

                try {
                    const response = await fetch(`/api/${path}/feed`);
                    if (response.status === 200) {

                        const userTweets = await response.json();
                        setUserTweets(userTweets);
                        // setImageState(userTweets.tweetsById.media[0])
                    }
                    else {
                        //better error handling
                        setError(true)
                        throw Error('Response was not 200/success')
                    }
                }
                catch (err) {
                    setError(true)
                    throw Error("Error Occured getting users Tweets")
                }
            }
        }
        handleClickedProfile()
    }, [path, tweetHomeFeedState])

    return (
        <React.Fragment>
            {selectedUser !== null && path !== null && userTweets !== null &&
                < MainUserProfile >

                    <Profile>
                        {/* USER INFO DIV. */}
                        <UserInfo>
                            <Banner src={selectedUser.bannerSrc} />
                            <UserImg src={selectedUser.avatarSrc} />
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
                                <Btn key={`${eachId}${index}`} type='button' onClick={() => history.push(`/tweet/${eachId}`)}>
                                    <Tweet allTweets={userTweets.tweetsById} tweetId={eachId}></Tweet>
                                </Btn>
                            )
                        })}
                    </div>}
                </MainUserProfile>}
            {error && <Error></Error>}
        </React.Fragment >
    )


}

export default UserProfiles

const Btn = styled.div`
width: 100%;
cursor: pointer;
&:hover {
    opacity: 0.7;
}

`
const MainUserProfile = styled.div`
width: 100%;
height: 100%;
margin: 0;
@media screen and (max-width: 768px) {
border-top: 1px solid white;
}
`
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



