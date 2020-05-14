import React, { useEffect } from 'react';
import { createContext } from 'react';



export const TweetHomeContext = createContext();

const InitialState = {
    isRetrieved: false,
    homeFeedTweets: null,
    post: false,
}
const reducer = (state, action) => {
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
                state.homeFeedTweets.tweetsById[action.id].numLikes = action.value
            }
            else if (action.liked === false) {
                state.homeFeedTweets.tweetsById[action.id].isLiked = false;
                state.homeFeedTweets.tweetsById[action.id].numLikes = action.value

            }
            return {
                ...state,
            }
        }
        case 'change-retweets': {
            if (action.retweeted) {
                state.homeFeedTweets.tweetsById[action.id].isRetweeted = true;
                state.homeFeedTweets.tweetsById[action.id].numRetweets = action.value;

            }
            else if (action.retweeted === false) {
                state.homeFeedTweets.tweetsById[action.id].isRetweeted = false;
                state.homeFeedTweets.tweetsById[action.id].numRetweets = action.value;

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

    //on componeent mount, get all tweets of home
    useEffect(() => {
        //only fetch the first time, after getting the data.
        // if (tweetHomeFeedState.isRetrieved === false) {
        const getAllTweets = async () => {
            let fetchTweets = await fetch('api/me/home-feed')
            let allTweets = await fetchTweets.json()
            //dispatch to reducer to load all homefeed tweets
            handleHomeTweet(allTweets)
        }
        getAllTweets();
        // }
    }, [])


    const handleHomeTweet = (data) => {
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

    // const handleFollow = (data) => {
    //     dispatch({
    //         type: 'update-follow',
    //         ...data
    //     })
    // }


    return (
        <TweetHomeContext.Provider
            value={{
                tweetHomeFeedState,
                handleUserLikes,
                handleUserRetweets,
                handlePost,
                // handleFollow
            }}>
            {children}
        </TweetHomeContext.Provider>
    )

}


export default TweetHomeProvider;