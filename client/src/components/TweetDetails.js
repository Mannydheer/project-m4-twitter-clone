import React, { useEffect, useState, } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import TweetLikeRetweetAction from './TweetLikeRetweetAction';





const TweetDetails = () => {

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
    console.log(singleTweetState)
    return (
        <React.Fragment>
            {fetchCheck && <Text>
                <ImageAuthor src={singleTweetState.author.avatarSrc} alt='author'></ImageAuthor>
                <StyledUserDiv>{singleTweetState.author.displayName} @{singleTweetState.author.handle}</StyledUserDiv>
                <div>{singleTweetState.status}</div>
                <div>{dateConverter(singleTweetState.timestamp)}</div>
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

@media only screen and (min-width: 475px) {
width: 700px;
height: 450px;
border-radius: 25px;

}
@media only screen and (max-width: 450px) {
    width: 100vw;
height: 450px;
}


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


@media only screen and (min-width: 475px) {
color: white;
border: gray 1px solid;
width: 50vw;
}

@media only screen and (max-width: 450px) {
width: 100vw;
}



`