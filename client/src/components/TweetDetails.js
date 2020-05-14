import React, { useEffect, useState, } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import TweetLikeRetweetAction from './TweetLikeRetweetAction';
import { TweetHomeContext } from './TweetHomeContext';
import CircularProgress from '@material-ui/core/CircularProgress';

const TweetDetails = () => {

    const { tweetHomeFeedState } = React.useContext(TweetHomeContext)

    const [homeTweets, setHomeTweets] = useState(tweetHomeFeedState.homeFeedTweets.tweetsById)

    let history = useHistory();
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
            setsingleTweetState(singleTweet.tweet)
            setFetchCheck(true)
        }
        getSingleTweet();
    }, [])

    const handler = (event) => {
        event.preventDefault();
        event.stopPropagation();
        history.push(`/user/${singleTweetState.author.handle}`)
    }
    return (<>  <BigWrapper>
        {fetchCheck && <Text>
            <ImageAuthor src={singleTweetState.author.avatarSrc} alt='author'></ImageAuthor>
            <StyledUserDiv onClick={handler}>{singleTweetState.author.displayName} @{singleTweetState.author.handle}</StyledUserDiv>
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
width: 50%;
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
&:hover {
    text-decoration: underline;
    cursor: pointer;
}
`
const StyledLikeRetweet = styled.div`
width: 50vw;

border: solid gray 1px;
`
const Text = styled.div`
width: 50vw;
border: gray 1px solid;


text-align: center;

`