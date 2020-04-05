import React, { useEffect, useState, } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import TweetLikeRetweetAction from './TweetLikeRetweetAction';


const TweetDetails = () => {

    let location = useLocation();
    let splitpath = location.pathname.split('/')
    let path = splitpath[2];

    console.log('INSIDE TWEET DETAILS')



    const [singleTweetState, setsingleTweetState] = useState(null)
    const [fetchCheck, setFetchCheck] = useState(false)

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
    console.log(singleTweetState)
    return (
        <React.Fragment>
            {fetchCheck && <Text>
                <ImageAuthor src={singleTweetState.author.avatarSrc} alt='author'></ImageAuthor>
                <StyledUserDiv>{singleTweetState.author.displayName} @{singleTweetState.author.handle}</StyledUserDiv>
                <div>{singleTweetState.status}</div>
                <div>{singleTweetState.timestamp}</div>
                {singleTweetState.media.length > 0 &&
                    <TweetImage src={singleTweetState.media[0].url}></TweetImage>}
                {/* message */}
                <StyledLikeRetweet>
                    <TweetLikeRetweetAction tweetId={path}></TweetLikeRetweetAction>
                </StyledLikeRetweet>

            </Text>}
        </React.Fragment>
    )
}

export default TweetDetails;
const TweetImage = styled.img`
width: 700px;
height: 450px;
border-radius: 25px;
`

const ImageAuthor = styled.img`
border-radius: 50%;
width: 50px,;
height: 50px;
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
color: white;
border: gray 1px solid;

`