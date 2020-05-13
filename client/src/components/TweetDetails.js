import React, { useEffect, useState, } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import TweetLikeRetweetAction from './TweetLikeRetweetAction';
import { TweetHomeContext } from './TweetHomeContext';
import CircularProgress from '@material-ui/core/CircularProgress';







const TweetDetails = () => {

    const { tweetHomeFeedState } = React.useContext(TweetHomeContext)

    const [homeTweets, setHomeTweets] = useState(tweetHomeFeedState.homeFeedTweets.tweetsById)


    let location = useLocation();
    let splitpath = location.pathname.split('/')
    let path = splitpath[2];
    const [singleTweetState, setsingleTweetState] = useState(null)
    const [fetchCheck, setFetchCheck] = useState(false)


    const dateConverter = (timeData) => {
        let d = new Date(timeData);
        let fullDate = d.toDateString(timeData).split(' ').splice(1, 2).join(', ')
        return fullDate
    }

    //component mount
    useEffect(() => {
        const getSingleTweet = async () => {
            let getselectedTweet = await fetch(`/api/tweet/${path}`)
            let singleTweet = await getselectedTweet.json()
            console.log(singleTweet, 'SINGLE TWEET INSIDE TWEET DETIALS')
            setsingleTweetState(singleTweet.tweet)
            setFetchCheck(true)
        }
        getSingleTweet();
    }, [])
    return (<>
        <BigWrapper>
            {fetchCheck && <Text>
                <ImageAuthor src={singleTweetState.author.avatarSrc} alt='author'></ImageAuthor>
                <StyledUserDiv>{singleTweetState.author.displayName} @{singleTweetState.author.handle}</StyledUserDiv>
                <div>{singleTweetState.status}</div>
                <div>{dateConverter(singleTweetState.timestamp)}</div>
                {singleTweetState.media.length > 0 &&
                    <TweetImage src={singleTweetState.media[0].url}></TweetImage>}
                {/* message */}

            </Text>}
            {fetchCheck ? <StyledLikeRetweet>
                <TweetLikeRetweetAction tweetId={path} allTweets={homeTweets}></TweetLikeRetweetAction>
            </StyledLikeRetweet> : <StyledCircle><CircularProgress></CircularProgress></StyledCircle>}

        </BigWrapper>

    </>
    )
}

export default TweetDetails;
const StyledCircle = styled.div`
position: absolute;
top: 0%;
right: 50%;
`

const BigWrapper = styled.div`
width: 70%;

margin: 0 auto;
@media screen and (max-width: 768px) {
width: 100%;
height: 100%;
}
`
const TweetImage = styled.img`
border-radius: 25px;
width: 70%;
height: 70%;
`
const ImageAuthor = styled.img`
border-radius: 50%;
width: 100px,;
height: 100px;
padding: 20px;
color: white;
`
const StyledUserDiv = styled.div`
font-weight: bold;
padding: 10px 0 10px 0;
`
const StyledLikeRetweet = styled.div`
border: solid gray 1px;
`
const Text = styled.div`
border: gray 1px solid;
width: 100%;

text-align: center;

`