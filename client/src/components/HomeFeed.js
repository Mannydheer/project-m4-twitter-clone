import React, { useState } from 'react';
import Tweet from './Tweet';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import TweetText from './TweetText';
import { TweetHomeContext } from './TweetHomeContext';


const HomeFeed = () => {

    //history
    let history = useHistory();
    const { tweetHomeFeedState } = React.useContext(TweetHomeContext)
    return (
        <BigWrapper>
            <StyledHome>Home</StyledHome>
            <TweetText></TweetText>
            {/* {tweetIds !== null && allTweets !== null && */}
            {tweetHomeFeedState.homeFeedTweets !== null &&
                tweetHomeFeedState.homeFeedTweets.tweetIds.map((tweetId) => {
                    return (<Btn key={tweetId} type='button' onClick={() => history.push(`/tweet/${tweetId}`)}>
                        <Tweet allTweets={tweetHomeFeedState.homeFeedTweets.tweetsById} tweetId={tweetId} ></Tweet>
                    </Btn>
                    )
                })
            }
        </BigWrapper>
    )
}
export default HomeFeed;

const BigWrapper = styled.div`

@media screen and (max-width: 768px) {
width: 100%;
margin: 0;
}

`
const Btn = styled.div`
width: 100%;
cursor: pointer;
&:hover {
    opacity: 0.7;
}



`

const StyledHome = styled.div`
width: 80%;
margin: 0 auto;
padding: 1rem 0;
text-align: center;
font-size: 36px;
border: solid 1px gray;
@media screen and (max-width: 768px) {
width: 100%;
margin: 0;
}

`

