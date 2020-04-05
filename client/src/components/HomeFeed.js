import React, { useState, useEffect } from 'react';
import Tweet from './Tweet';
import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';
import { CurrentUserContext } from './CurrentUserContext';
import TweetText from './TweetText';
import { TweetHomeContext } from './TweetHomeContext';






const HomeFeed = () => {

    //history
    let history = useHistory();
    const [tweets, setTweets] = useState(null);
    const { tweetHomeFeedState } = React.useContext(TweetHomeContext)

    return (
        <div>
            <StyledHome>Home</StyledHome>
            <TweetText setTweets={setTweets}></TweetText>
            {/* {tweetIds !== null && allTweets !== null && */}
            {tweetHomeFeedState.homeFeedTweets !== null &&
                tweetHomeFeedState.homeFeedTweets.tweetIds.map((tweetId) => {
                    return (
                        <React.Fragment>
                            <Btn type='button' onClick={() => history.push(`/tweet/${tweetId}`)}>
                                <Tweet keys={tweetId} allTweets={tweetHomeFeedState.homeFeedTweets.tweetsById} tweetId={tweetId} ></Tweet>
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
width: 56vw;
cursor: pointer;


`

const StyledHome = styled.div`
font-size: 36px;
padding: 10px 10px;
border: solid 1px gray;

`

