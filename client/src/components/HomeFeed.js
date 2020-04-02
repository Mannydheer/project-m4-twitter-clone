import React, { useState, useEffect } from 'react';
import Tweet from './Tweet';
import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';
import { CurrentUserContext } from './CurrentUserContext';
import TweetText from './TweetText';




const HomeFeed = () => {

    //history
    let history = useHistory();
    // holds ids for tweets.
    const [tweetIds, setTweetIds] = useState(null)
    const [allTweets, setAllTweets] = useState(null)



    //
    // const [likeBool, setLikebool] = React.useState(true);

    //component did mount

    useEffect(() => {
        const getAllTweets = async () => {
            let fetchTweets = await fetch('api/me/home-feed')
            let allTweets = await fetchTweets.json()
            setTweetIds(allTweets.tweetIds)
            setAllTweets(allTweets.tweetsById)
        }
        getAllTweets();
    }, [])

    //handle POST tweets. 
    //form... on submit of the form.. triggers function 




    console.log(allTweets)

    return (
        <div>
            <StyledHome>Home</StyledHome>
            <TweetText></TweetText>


            {tweetIds !== null && allTweets !== null &&
                tweetIds.map((tweetId) => {
                    return (
                        <React.Fragment>
                            <Btn type='button' onClick={() => history.push(`/tweet/${tweetId}`)}>
                                <Tweet keys={tweetId} allTweets={allTweets} tweetId={tweetId} ></Tweet>
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

