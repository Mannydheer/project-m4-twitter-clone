import React, { useContext, useState, useEffect } from 'react';
import { createContext } from 'react';



export const TweetHomeContext = createContext();

const InitialState = {
    isRetrieved: false,
    homeFeedTweets: null,
    post: false,
}
const reducer = (state, action) => {
    console.log(action, 'ACTION')
    switch (action.type) {
        case 'load-all-tweets': {
            return {
                ...state,
                isRetrieved: true,
                homeFeedTweets: action.allTweets
            }
        }
        case 'change-likes': {
            if (action.liked) {
                state.homeFeedTweets.tweetsById[action.id].isLiked = true;
            }
            else if (action.liked === false) {
                state.homeFeedTweets.tweetsById[action.id].isLiked = false;
            }
            return {
                ...state,
            }
        }
        case 'change-retweets': {
            if (action.retweeted) {
                state.homeFeedTweets.tweetsById[action.id].isRetweeted = true;
            }
            else if (action.retweeted === false) {
                state.homeFeedTweets.tweetsById[action.id].isRetweeted = false;
            }
            return {
                ...state,
            }
        }
        case 'force-post': {
            return {
                ...state,
                homeFeedTweets: action.allTweets
            }
        }
    }
}
const TweetHomeProvider = ({ children }) => {

    const [tweetHomeFeedState, dispatch] = React.useReducer(reducer, InitialState)

    console.log(tweetHomeFeedState, 'NEW STATE')

    //on componeent mount, get all tweets of home
    useEffect(() => {
        //only fetch the first time, after getting the data.
        if (tweetHomeFeedState.isRetrieved === false) {
            const getAllTweets = async () => {
                let fetchTweets = await fetch('api/me/home-feed')
                let allTweets = await fetchTweets.json()
                //dispatch to reducer to load all homefeed tweets
                handleHomeTweet(allTweets)
            }
            getAllTweets();
        }
    }, [])


    const handleHomeTweet = (data) => {
        console.log(data)
        dispatch({
            type: 'load-all-tweets',
            allTweets: data,
        })
    }
    const handleUserLikes = (data) => {
        dispatch({
            type: 'change-likes',
            ...data
        })
    }

    const handleUserRetweets = (data) => {
        console.log(data, 'INSIDE RETWEET')
        dispatch({
            type: 'change-retweets',
            ...data
        })
    }
    const handlePost = (allTweets) => {

        dispatch({
            type: 'force-post',
            allTweets: allTweets
        })
    }

    return (
        <TweetHomeContext.Provider
            value={{
                tweetHomeFeedState,
                handleUserLikes,
                handleUserRetweets,
                handlePost
            }}>
            {children}
        </TweetHomeContext.Provider>
    )

}


export default TweetHomeProvider;