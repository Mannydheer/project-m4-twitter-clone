import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom'
import { TweetHomeContext } from './TweetHomeContext';
import TweetActionIcon from './TweetActionIcon';
import Heart from './Heart';






const Tweet = ({ allTweets, tweetId }) => {

    console.log(allTweets, 'THIS IS ALL TWEETS')

    let Image = allTweets[tweetId].media[0]
    let history = useHistory();
    const { handleUserLikes, handleUserRetweets } = React.useContext(TweetHomeContext)


    //-----------------------------------------------
    const dateConverter = (timeData) => {
        let d = new Date(timeData);
        let fullDate = d.toDateString(timeData).split(' ').splice(1, 2).join(', ')
        return fullDate
    }

    const handleLiking = (event) => {
        //double check these two. Stop reloading.. and onclick on PARENT. 
        event.stopPropagation();
        event.preventDefault();
        //just to trigger useEffect on clicking like
        handlePutLike();
    }
    const handleRetweeting = (event) => {
        //double check these two. Stop reloading.. and onclick on PARENT. 
        event.stopPropagation();
        event.preventDefault();
        //just to trigger useEffect on clicking like
        handlePutRetweet();
    }
    const handlePutRetweet = async () => {
        //if false or NOT CURRENTLY LIKED
        if (allTweets[tweetId].isRetweeted === false) {
            try {
                console.log('INSIDE Retweet')
                let response = await fetch(`/api/tweet/${tweetId}/retweet`, {
                    method: 'PUT',
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json'
                    },
                    //like the tweet
                    body: JSON.stringify({
                        retweet: true
                    })
                })
                let status = await response.json();
                console.log(status, 'RETWEET')

                //must change the value in the front end. 
                if (status.success) {
                    handleUserRetweets({
                        id: tweetId,
                        retweeted: true,
                        value: 1,
                    })
                }
            }
            catch (error) {
                throw Error('error retweeting')
            }
        }
        //if already liked.
        //else if to not trigger both ifs.
        else if (allTweets[tweetId].isRetweeted === true) {
            console.log('INSIDE REMOVE RETWEET')
            try {
                let response = await fetch(`/api/tweet/${tweetId}/retweet`, {
                    method: 'PUT',
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json'
                    },
                    //like the tweet
                    body: JSON.stringify({
                        retweet: false
                    })
                })
                let status = await response.json();
                console.log(status, 'remove RETWEET')
                if (status.success) {
                    handleUserRetweets({
                        id: tweetId,
                        retweeted: false,
                        value: 0,
                    })
                }
            }
            catch (error) {
                throw Error('error liking')
            }
        }
    }
    // -------------------------------------
    const handlePutLike = async () => {
        //if false or NOT CURRENTLY LIKED
        if (allTweets[tweetId].isLiked === false) {
            try {
                console.log('INSIDE LIKED')
                let response = await fetch(`/api/tweet/${tweetId}/like`, {
                    method: 'PUT',
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json'
                    },
                    //like the tweet
                    body: JSON.stringify({
                        like: true
                    })
                })
                let status = await response.json();
                //must change the value in the front end. 
                if (status.success) {
                    handleUserLikes({
                        id: tweetId,
                        liked: true,
                        value: 1,
                    })
                }
            }
            catch (error) {
                throw Error('error liking')
            }
        }
        //if already liked.
        //else if to not trigger both ifs.
        else if (allTweets[tweetId].isLiked === true) {
            console.log('INSIDE REMOVE LIKE')
            try {
                let response = await fetch(`/api/tweet/${tweetId}/like`, {
                    method: 'PUT',
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json'
                    },
                    //like the tweet
                    body: JSON.stringify({
                        like: false
                    })
                })
                console.log(response)
                let status = await response.json();
                if (status.success) {
                    handleUserLikes({
                        id: tweetId,
                        liked: false,
                        value: 0,
                    })

                }
            }
            catch (error) {
                throw Error('error liking')
            }
        }
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
                <Icons>
                    <Wrap>
                        {allTweets[tweetId].isLiked ? <Flex onClick={handleLiking}>
                            <Heart width={30} isToggled={true}></Heart>
                            <div style={{ position: 'relative', right: '40px', top: '5px' }}>
                                {allTweets[tweetId].numLikes}
                            </div>
                        </Flex>
                            :
                            <div onClick={handleLiking}><Heart width={30}></Heart></div>}
                    </Wrap>
                    <Wrap>


                        {allTweets[tweetId].isRetweeted ?
                            <Flex onClick={handleRetweeting}>
                                <TweetActionIcon size={30} color={'green'} />
                                <div style={{ position: 'relative', right: '40px', top: '5px' }}>
                                    {allTweets[tweetId].numRetweets}</div>
                            </Flex>
                            :
                            <div onClick={handleRetweeting}><TweetActionIcon size={30} color={'black'} /></div>}
                    </Wrap>
                </Icons>
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
}



`
const Wrap = styled.div`
display: flex;


`
const Flex = styled.div`
display: flex;


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
const Icons = styled.div`
border: solid 1px black;
border-bottom: none;
display: flex;
justify-content: space-evenly;
&:hover {
    cursor:pointer;
}

`

const Btn = styled.button`
font-size: 24px;
padding: 10px;
cursor: pointer;



` 