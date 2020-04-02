import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { CurrentUserContext } from './CurrentUserContext';
import { Link, useHistory } from 'react-router-dom'
import Liker from './Liker';


const Tweet = ({ allTweets, tweetId }) => {

    let retweetName = allTweets[tweetId].retweetFrom;
    let history = useHistory();

    const [likeBool, setLikeBool] = useState(false);

    // const [likerColor, setLikerColor] = useState(false)
    // const backgroundColor = likerColor ? 'green' : 'red';


    // ------------------------------------
    const handler = (event) => {
        event.preventDefault();
        event.stopPropagation();
        history.push(`/user/${allTweets[tweetId].author.handle}`)
    }
    // -------------------------------------

    const handleLiking = (event) => {
        //double check these two. Stop reloading.. and onclick on PARENT. 
        event.stopPropagation();
        event.preventDefault();
        //just to trigger useEffect on clicking like
        setLikeBool(true)
    }

    // console.log(likeBool, 'LIKEBOOl')

    // -------------------------------------

    // -------------------------------------

    return (
        <React.Fragment>
            <StyledTweetDiv>
                {/* if retweet exists */}
                {retweetName !== undefined ? <div>Name: {allTweets[tweetId].retweetFrom.displayName}</div> : <span></span>}
                    Name: <StyledUserDiv onClick={handler}>{allTweets[tweetId].author.displayName}</StyledUserDiv> - @{allTweets[tweetId].author.handle}
                <span>{allTweets[tweetId].timestamp}</span>
                <div>Tweet: {allTweets[tweetId].status}</div>
                <ImageAuthor src={allTweets[tweetId].author.avatarSrc} alt='author'>
                </ImageAuthor>
                {retweetName !== undefined ? <img src={allTweets[tweetId].retweetFrom.avatarSrc} alt='retweeter'></img>
                    : <span></span>}
                {/* like and retweeting.  */}
                <button onClick={handleLiking}> <span >Like</span></button>
                {likeBool && <Liker likeBool={likeBool} tweetId={tweetId} allTweets={allTweets} setLikeBool={setLikeBool}></Liker>}
            </StyledTweetDiv>

        </React.Fragment>


    )


}

export default Tweet;

const StyledTweetDiv = styled.div`
border: black 1px solid;
`

const ImageAuthor = styled.img`
border-radius: 50%;
width: 50px,;
height: 50px;
`

const StyledUserDiv = styled.div`
font-weight: bold;

&:hover {
    text-decoration: underline;
    cursor: pointer;
}

`