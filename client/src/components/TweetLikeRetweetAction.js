import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { CurrentUserContext } from './CurrentUserContext';
import { Link, useHistory } from 'react-router-dom'
import { TweetHomeContext } from './TweetHomeContext';

import TweetActionIcon from './TweetActionIcon';
import Heart from './Heart';
import TweetAction from './TweetLikeRetweetAction';




const TweetLikeRetweetAction = ({ tweetId }) => {

    //dont pass allTweets since we want to reuse compoenent so we can get homefeed state form context
    const { tweetHomeFeedState, handleUserLikes, handleUserRetweets } = React.useContext(TweetHomeContext)

    console.log(tweetHomeFeedState, 'FUCKING HOME STATE k')

    const [homeTweets, setHomeTweets] = useState(tweetHomeFeedState.homeFeedTweets.tweetsById)


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
        if (homeTweets[tweetId].isRetweeted === false) {
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
                    })
                }
            }
            catch (error) {
                throw Error('error retweeting')
            }
        }
        //if already liked.
        //else if to not trigger both ifs.
        else if (homeTweets[tweetId].isRetweeted === true) {
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
        if (homeTweets[tweetId].isLiked === false) {
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
                    })
                }
            }
            catch (error) {
                throw Error('error liking')
            }
        }
        //if already liked.
        //else if to not trigger both ifs.
        else if (homeTweets[tweetId].isLiked === true) {
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
                    handleUserLikes({
                        id: tweetId,
                        liked: false,
                    })
                    // allTweets[tweetId].isLiked = false;
                    // allTweets[tweetId].numLikes -= 1
                    // updateLikes({
                    //     liked: false
                    // })
                }
            }
            catch (error) {
                throw Error('error liking')
            }
        }
    }
    return (
        <React.Fragment>
            {homeTweets !== null && <Icons>
                <div>
                    {homeTweets[tweetId].isLiked ? <div onClick={handleLiking}><Heart width={30} isToggled={true}></Heart></div> : <div onClick={handleLiking}><Heart width={30}></Heart></div>}
                </div>
                {homeTweets[tweetId].isRetweeted ?
                    <div onClick={handleRetweeting}><TweetActionIcon size={30} color={'green'} /></div>
                    :
                    <div onClick={handleRetweeting}><TweetActionIcon size={30} color={'black'} /></div>}
            </Icons>}
        </React.Fragment>
    )
}


export default TweetLikeRetweetAction;
const Icons = styled.div`
display: flex;
justify-content: space-evenly;
&:hover {
    cursor:pointer;
}

`