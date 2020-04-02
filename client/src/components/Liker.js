import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { CurrentUserContext } from './CurrentUserContext';




const Liker = ({ likeBool, setLikeBool, allTweets, tweetId }) => {

    const { updateLikes } = React.useContext(CurrentUserContext)




    useEffect(() => {
        const handlePutLike = async () => {
            //only if cliked on Like

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
                    //color
                    // setLikerColor(!likerColor)
                    setLikeBool(false)
                    //increment likes
                    updateLikes({
                        liked: true
                    })

                }
                catch (error) {
                    throw Error('error liking')
                }
                //else if already liked. 
            }
            //if already liked.
            if (allTweets[tweetId].isLiked === true) {
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
                    //color
                    // setLikerColor(!likerColor)
                    setLikeBool(false)
                    // updateLikes({
                    //     liked: false
                    // })

                    console.log(status)
                }
                catch (error) {
                    throw Error('error liking')
                }
            }
        }

        //function call
        handlePutLike();
        //render as many as as it gets called?
    })







    return (
        <div>
            LIKER
        </div>
    )



}


export default Liker