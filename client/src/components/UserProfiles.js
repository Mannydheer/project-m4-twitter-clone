import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import styled from 'styled-components';
import UserFollowUnfollow from './UserFollowUnfollow';
import { COLORS } from '../constants';




const UserProfiles = ({ storeFollowers }) => {

    let location = useLocation().pathname.split('/')
    let path = location[2];


    const [selectedUser, setSelectedUser] = useState(null);
    const [userBool, setuserBool] = useState(false);

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
            setuserBool(true)
            //get all tweets related to profile.
        }
        //function call.
        //if its null, then followers was not clicked.Not undefined if I dont click on followers
        handleClickedProfile()

    }, [])


    useEffect(() => {
        const getUserTweets = async () => {
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
    }, [])

    //follow unfollow button: MaybeRefactor this to a reuse. 
    console.log(selectedUser)
    return (
        <React.Fragment>



            {userBool &&
                <MainUserProfile>
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

                                <StyledTweetDiv>
                                    <ImageAuthor src={userTweets.tweetsById[eachId].author.avatarSrc}></ImageAuthor>
                                    <div>

                                        <StyledUserDiv>{userTweets.tweetsById[eachId].author.displayName} @{userTweets.tweetsById[eachId].author.handle}</StyledUserDiv >
                                        <div>{userTweets.tweetsById[eachId].status}</div>
                                        {userTweets.tweetsById[eachId].media.length > 0 &&
                                            <TweetImage src={userTweets.tweetsById[eachId].media[0].url}></TweetImage>}
                                    </div>

                                </StyledTweetDiv>


                            )
                        })}
                    </div>}



                </MainUserProfile>}


        </React.Fragment >
    )


}

export default UserProfiles

const MainUserProfile = styled.div`
width: 56vw;
border: solid 1px gray;
`
const StyledTweetDiv = styled.div`
border: solid 1px gray;
padding: 10px;
line-height: 1.5;
display: flex;
`
const Profile = styled.div`
height: 70vh;

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
color: gray;

`
const FollowsYou = styled.span`
color: black;
background-color: lightgray;
border-radius: 10px;
opacity: 0.5;
padding: 5px;
`


const Banner = styled.img`
width: 56vw;
height: 35vh;
`
const UserImg = styled.img`
width: 10vw;
height: 20vh;
border-radius: 50%;
position: relative;
left: 10px;
bottom: 100px;
border: solid white 5px;

`

const UserInfo = styled.div`
padding-left: 10px;
border-bottom: solid gray 1px;
position: relative;
bottom: 50px;
font-size: 1.9em;

a{
    text-decoration: none;
    padding-right: 20px;
}
`
const FlexFollow = styled.div`
display: flex;
justify-content: flex-end;
padding-right: 20px;
position: relative;
bottom: 100px;
background-color: transparent;



`


const StyledUserDiv = styled.div`
font-weight: bold;


`




