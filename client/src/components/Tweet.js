import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom'
import { TweetHomeContext } from './TweetHomeContext';
import TweetActionIcon from './TweetActionIcon';
import Heart from './Heart';




const Tweet = ({ allTweets, tweetId }) => {

    let Image = allTweets[tweetId].media[0]
    let history = useHistory();
    const { handleUserLikes, handleUserRetweets } = React.useContext(TweetHomeContext)


    //-----------------------------------------------
    // console.log(tweetId, 'SINDEI TWEET ID')

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
                        <span>{allTweets[tweetId].timestamp}</span>
                        <div>{allTweets[tweetId].status}</div>
                        {Image !== undefined ? <TweetImage src={Image.url} alt='media'></TweetImage>
                            : <span></span>}
                        {/* like and retweeting. compoenent  */}


                    </div>
                    {/*  <Heart width={heartSize} isToggled={isLiked} */}
                </StyledTweetDiv>
                <Icons>
                    <Wrap>
                        {allTweets[tweetId].isLiked ? <div onClick={handleLiking}>
                            <Heart width={30} isToggled={true}></Heart><span>{allTweets[tweetId].numLikes}</span>
                        </div>
                            :
                            <div onClick={handleLiking}><Heart width={30}></Heart></div>}
                    </Wrap>
                    <Wrap>


                        {allTweets[tweetId].isRetweeted ?
                            <div onClick={handleRetweeting}><TweetActionIcon size={30} color={'green'} /><div>{allTweets[tweetId].numRetweets}</div>
                            </div>
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
padding: 10px;
line-height: 1.5;
display: flex;
width: 54.5vw;
color: white;

@media only screen and (max-width: 450px) {
    width: 100vw;
    display: block;
}
`
const Wrapper = styled.div`
border: solid 1px gray;
@media only screen and (max-width: 450px) {
    width: 100vw;
}
`
const Wrap = styled.div`
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
height: 400px;
width: 600px;
@media only screen and (max-width: 450px) {

height: 100px;
width: 200px;
}
`


const StyledUserDiv = styled.div`
font-weight: bold;


&:hover {
    text-decoration: underline;
    cursor: pointer;
}

`
const Icons = styled.div`
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