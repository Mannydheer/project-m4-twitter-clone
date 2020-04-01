import React, { useState, useEffect } from 'react';
import Tweet from './Tweet';
import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';
import { CurrentUserContext } from './CurrentUserContext';




const HomeFeed = () => {

    //history
    let history = useHistory();
    // holds ids for tweets.
    const [tweetIds, setTweetIds] = useState(null)
    const [allTweets, setAllTweets] = useState(null)
    //
    // const { updateLike } = React.useContext(CurrentUserContext)
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



    // const handleLikes = () => {
    //     setLikebool(!likeBool)
    //     updateLike(likeBool)

    // }
    return (
        <div>
            {tweetIds !== null && allTweets !== null &&
                tweetIds.map((tweetId) => {
                    return (
                        <React.Fragment>
                            <Btn type='button' onClick={() => history.push(`/tweet/${tweetId}`)}>
                                <Tweet keys={tweetId} allTweets={allTweets} tweetId={tweetId} ></Tweet>
                            </Btn>
                            {/* <button>Retweet</button>
                            <button onClick={handleLikes}>Like</button> */}
                        </React.Fragment>
                    )
                })
            }
        </div>
    )
}
export default HomeFeed;
const Btn = styled.button`
display: block;
width: 400px;
background-color: transparent;
`