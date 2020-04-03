import React, { useState, useEffect } from 'react';
import Tweet from './Tweet';
import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';
import { CurrentUserContext } from './CurrentUserContext';
import TweetText from './TweetText';




const HomeFeed = () => {

    //history
    let history = useHistory();
    const [tweets, setTweets] = useState(null);

    //component did mount
    useEffect(() => {
        const getAllTweets = async () => {
            let fetchTweets = await fetch('api/me/home-feed')
            let allTweets = await fetchTweets.json()
            setTweets(allTweets)
        }
        getAllTweets();
    }, [])
    return (
        <div>
            <StyledHome>Home</StyledHome>
            <TweetText setTweets={setTweets}></TweetText>
            {/* {tweetIds !== null && allTweets !== null && */}
            {tweets !== null &&
                tweets.tweetIds.map((tweetId) => {
                    return (
                        <React.Fragment>
                            <Btn type='button' onClick={() => history.push(`/tweet/${tweetId}`)}>
                                <Tweet keys={tweetId} allTweets={tweets.tweetsById} tweetId={tweetId} ></Tweet>
                            </Btn>
                        </React.Fragment>
                    )
                })
            }
        </div>
    )
}
export default HomeFeed;
const Btn = styled.div`
display: block;
width: 80%;
background-color: transparent;
cursor: pointer;
`

const StyledHome = styled.div`
font-size: 36px;
`

