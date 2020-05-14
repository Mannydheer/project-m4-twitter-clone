import React, { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Tweet from '../components/Tweet';
import Error from './Error';
import { TweetHomeContext } from './TweetHomeContext';
import ProfileDetails from './ProfileDetails';


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

            const getUserProfile = await fetch(`https://twitter-clone-bootcamp.herokuapp.com/api/${path}/profile`);
            const returnedProfile = await getUserProfile.json();
            setSelectedUser(returnedProfile.profile)

            try {
                const response = await fetch(`https://twitter-clone-bootcamp.herokuapp.com/api/${path}/feed`);
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
        handleClickedProfile()
    }, [path, tweetHomeFeedState])

    return (
        <React.Fragment>
            {selectedUser !== null && path !== null && userTweets !== null &&
                < MainUserProfile >
                    {/* component for all profile details. */}
                    <ProfileDetails selectedUser={selectedUser} path={path} />
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




