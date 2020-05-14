import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import ProfileDetails from './ProfileDetails';
import Tweet from '../components/Tweet';
import Error from './Error';
import { TweetHomeContext } from './TweetHomeContext';



const Profile = () => {


    const { tweetHomeFeedState } = React.useContext(TweetHomeContext)

    const [selectedUser, setSelectedUser] = useState(null);
    //state for userTweet/Retweet fetch;
    const [userTweets, setUserTweets] = useState(null);
    const [error, setError] = useState(false);

    let history = useHistory();


    useEffect(() => {

        const handleProfile = async () => {
            const getUserProfile = await fetch(`https://twitter-clone-bootcamp.herokuapp.com/api/me/profile`);
            const returnedProfile = await getUserProfile.json();
            setSelectedUser(returnedProfile.profile)
            try {
                const response = await fetch(`https://twitter-clone-bootcamp.herokuapp.com/api/me/home-feed`);
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
        handleProfile();
    }, [tweetHomeFeedState])




    return (
        <div>
            <React.Fragment>
                {selectedUser !== null && userTweets !== null &&
                    < MainUserProfile >
                        {/* USER INFO DIV. */}
                        {/* COMPONEENT */}
                        <ProfileDetails selectedUser={selectedUser} path={selectedUser.handle} />
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

        </div>
    )
}

export default Profile;


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