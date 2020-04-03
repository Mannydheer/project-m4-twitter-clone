import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { CurrentUserContext } from './CurrentUserContext';
import { Link, useHistory } from 'react-router-dom'


const Tweet = ({ allTweets, tweetId }) => {

    let Image = allTweets[tweetId].media[0]
    let history = useHistory();

    console.log(allTweets)

    const { updateLikes } = React.useContext(CurrentUserContext)
    const [retweet, setRetweeted] = useState(false);


    //it will refresh this specific tweet... double check.
    useEffect(() => {
    }, [retweet])

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
                    allTweets[tweetId].isRetweeted = true;
                    setRetweeted(!retweet)
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
                    allTweets[tweetId].isRetweeted = false;
                    setRetweeted(!retweet)
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
                    allTweets[tweetId].isLiked = true;
                    allTweets[tweetId].numLikes += 1
                    //context -update state likes.
                    updateLikes({
                        liked: true
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
                let status = await response.json();

                if (status.success) {
                    allTweets[tweetId].isLiked = false;
                    allTweets[tweetId].numLikes -= 1

                    updateLikes({
                        liked: false
                    })
                }
            }
            catch (error) {
                throw Error('error liking')
            }
        }
    }
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
                    {allTweets[tweetId].isLiked ? <Btn style={{ backgroundColor: 'green' }} onClick={handleLiking}> Liked </Btn> : <Btn style={{ backgroundColor: 'purple' }} onClick={handleLiking}>Like</Btn>}
                    {allTweets[tweetId].isRetweeted ? <Btn style={{ backgroundColor: 'green' }} onClick={handleRetweeting}> Retweeted </Btn> : <Btn style={{ backgroundColor: 'purple' }} onClick={handleRetweeting}>Retweet</Btn>}

                    {/* {likeBool && <Liker likeBool={likeBool} tweetId={tweetId} allTweets={allTweets} setLikeBool={setLikeBool}></Liker>} */}
                </div>
            </StyledTweetDiv>

        </React.Fragment>


    )


}

export default Tweet;

const StyledTweetDiv = styled.div`
border: solid 1px gray;
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

const Btn = styled.button`
font-size: 24px;
padding: 10px;
cursor: pointer;

` 