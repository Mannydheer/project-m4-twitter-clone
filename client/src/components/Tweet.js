import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { CurrentUserContext } from './CurrentUserContext';
import { Link, useHistory } from 'react-router-dom'
import Liker from './Liker';


const Tweet = ({ allTweets, tweetId }) => {

    let Image = allTweets[tweetId].media[0]
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
                <ImageAuthor src={allTweets[tweetId].author.avatarSrc} alt='author'></ImageAuthor>
                <div>
                    {/* {retweetName !== undefined ? <div>Name: {allTweets[tweetId].retweetFrom.displayName}</div> : <span></span>} */}
                    <StyledUserDiv onClick={handler}>{allTweets[tweetId].author.displayName} @{allTweets[tweetId].author.handle}</StyledUserDiv>
                    <span>{allTweets[tweetId].timestamp}</span>
                    <div>{allTweets[tweetId].status}</div>
                    {Image !== undefined ? <TweetImage src={Image.url} alt='media'></TweetImage>
                        : <span></span>}
                    {/* like and retweeting.  */}
                    <button onClick={handleLiking}> <span >Like</span></button>
                    {likeBool && <Liker likeBool={likeBool} tweetId={tweetId} allTweets={allTweets} setLikeBool={setLikeBool}></Liker>}
                </div>
            </StyledTweetDiv>

        </React.Fragment>


    )


}

export default Tweet;

const StyledTweetDiv = styled.div`
border: whitesmoke 1px solid;
padding: 10px;
line-height: 1.5;
display: flex;
`

const ImageAuthor = styled.img`
border-radius: 50%;
width: 50px,;
height: 50px;
padding: 10px;
`
const TweetImage = styled.img`
border-radius: 10%;
width: 100%;
height: 400px;
`


const StyledUserDiv = styled.div`
font-weight: bold;


&:hover {
    text-decoration: underline;
    cursor: pointer;
}

`