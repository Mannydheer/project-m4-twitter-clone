import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom'
import { TweetHomeContext } from './TweetHomeContext';
import TweetActionIcon from './TweetActionIcon';
import TweetLikeRetweetAction from './TweetLikeRetweetAction';



const Tweet = ({ allTweets, tweetId }) => {

    let Image = allTweets[tweetId].media[0]
    let history = useHistory();
    //-----------------------------------------------
    const dateConverter = (timeData) => {
        let d = new Date(timeData);
        let fullDate = d.toDateString(timeData).split(' ').splice(1, 2).join(', ')
        return fullDate
    }
    // ------------------------------------
    const handler = (event) => {
        event.preventDefault();
        event.stopPropagation();
        history.push(`/user/${allTweets[tweetId].author.handle}`)
    }
    return (
        <React.Fragment>
            <Wrapper>
                <StyledTweetDiv>
                    {/* if retweet exists */}
                    <ImageAuthor src={allTweets[tweetId].author.avatarSrc} alt='author'></ImageAuthor>
                    <div>
                        {allTweets[tweetId].retweetFrom !== undefined ? <div><TweetActionIcon size={15} color={'black'} /> {allTweets[tweetId].retweetFrom.displayName} Remeowed</div> : <span></span>}
                        <StyledUserDiv onClick={handler}>{allTweets[tweetId].author.displayName} @{allTweets[tweetId].author.handle}</StyledUserDiv>
                        <span>{dateConverter(allTweets[tweetId].timestamp)}</span>
                        <div>{allTweets[tweetId].status}</div>
                        <ImageWrapper>
                            {Image !== undefined && <TweetImage src={Image.url} alt='media'></TweetImage>}
                        </ImageWrapper>
                    </div>
                    {/*  <Heart width={heartSize} isToggled={isLiked} */}
                </StyledTweetDiv>
                <TweetLikeRetweetAction allTweets={allTweets} tweetId={tweetId} />
            </Wrapper>
        </React.Fragment >
    )
}

export default Tweet;

const StyledTweetDiv = styled.div`
width: 100%;
padding: 10px;
line-height: 1.5;
display: flex;
@media screen and (max-width: 768px) {
display: block;
width: 100%;
text-align: center;
}
`
const Wrapper = styled.div`
width: 80%;
margin: 0 auto;
border: solid 1px gray;
@media screen and (max-width: 768px) {
width: 100%;
margin: 0;
}
`


const ImageAuthor = styled.img`
border-radius: 50%;
width: 30px,;
height: 75px;
padding: 10px;
`
const TweetImage = styled.img`
border-radius: 25px;
width: 70%;
height: 70%;
margin: 1rem;

`
const ImageWrapper = styled.div`
display: flex;
justify-content: center;
`


const StyledUserDiv = styled.div`
font-weight: bold;


&:hover {
    text-decoration: underline;
    cursor: pointer;
}

`
