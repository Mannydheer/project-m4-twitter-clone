import React from 'react';
import styled from 'styled-components';
import { CurrentUserContext } from './CurrentUserContext';
import { Link, useHistory } from 'react-router-dom'


const Tweet = ({ allTweets, tweetId }) => {

    let retweetName = allTweets[tweetId].retweetFrom;
    let history = useHistory();



    // const handleClickedProfile = async (e) => {
    //     e.preventDefault();
    //     console.log('FUCK YOU')

    //     const getUserProfile = await fetch(`/api/${allTweets[tweetId].author.handle}/profile`);
    //     const returnedProfile = await getUserProfile.json();
    //     console.log(returnedProfile)

    // }

    const handler = (event) => {
        event.preventDefault();
        event.stopPropagation();
        console.log(allTweets)

        history.push(`/user/${allTweets[tweetId].author.handle}`)

    }

    console.log(allTweets)


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