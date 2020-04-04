import React, { useState, useEffect } from 'react';
import Tweet from './Tweet';
import styled from 'styled-components';
import { CurrentUserContext } from './CurrentUserContext';
import { TweetHomeContext } from './TweetHomeContext';
import { COLORS } from '../constants';



const TweetText = ({ setTweets }) => {

    const [tweet, setTweet] = useState('')
    const [postedTweet, setPostedTweet] = useState(null)
    const { state } = React.useContext(CurrentUserContext)
    const { handlePost } = React.useContext(TweetHomeContext)

    useEffect(() => {
        //when postedTweet holds the tweet
        if (postedTweet !== null) {
            const data = {
                status: postedTweet
            }
            const postHandler = async () => {

                //do a post to the database
                try {
                    let response = await fetch(`/api/tweet`, {
                        method: "POST",
                        headers: {
                            'Accept': 'application/json',
                            'Content-type': 'application/json'
                        },
                        body: JSON.stringify(data)
                    })
                    let post = await response.json();
                    //only refetch if post has something... if post is successful. and response is 200
                    if (response.status === 200 && post) {
                        //get all the feed again after the post and send it back to the context to update and state and re-render the feed. 
                        try {
                            let fetchTweets = await fetch('api/me/home-feed')
                            let allTweets = await fetchTweets.json()
                            console.log(allTweets, 'TWEETS AFTER POST')
                            handlePost(allTweets)
                        }
                        catch (err) {
                            throw Error('ERROR WHEN POSTING')
                        }
                    }
                }
                //if the whole post fails. 
                catch (error) {
                    throw Error('POST UNSUCCESSFUL')
                }

            }
            postHandler();
        }



        //on change of postedTweet, meaning when there is a submit
    }, [postedTweet])


    const handlePostData = (event) => {
        event.preventDefault();
        //store input into postedTweet
        setPostedTweet(tweet)
    }



    //on submit will store tweet
    return (
        <StyledTweeting>




            <StyledForm class="tweet" name="tweet" onSubmit={handlePostData}>
                <StyledProfileImage>
                    <ImageAuthor src={state.currentUser.avatarSrc}></ImageAuthor>
                </StyledProfileImage>
                <div class="form-content user">

                    <div class='form-item'>
                        <label for="tweetText"></label>
                        <TextTweet id="TweetText" type="text" value={tweet}
                            onChange={e => setTweet(e.target.value)}
                            name="givenTweet" placeholder="Whats happening..."
                            maxLength={280} required>
                        </TextTweet>
                        <Length>
                            <div>{280 - tweet.length}</div>
                        </Length>

                    </div>

                </div>
                <TweetButton>
                    <Btn class='button confirm' id='confirm-button'>
                        Tweet
            </Btn>
                </TweetButton>

            </StyledForm >
        </StyledTweeting>
    )


}


export default TweetText;

const StyledForm = styled.form`
border: solid 1px gray;
border-bottom: none;

`
const StyledTweeting = styled.div`
display: flex;
`

const TextTweet = styled.textarea`


height: 10vh;
width: 55.9vw;
border: none;
outline: none;
font-size: 1.7rem;

::placeholder {
    font-size: 1.7rem;
}


`

const ImageAuthor = styled.img`
border-radius: 50%;
width: 100px,;
height: 100px;
`

const StyledProfileImage = styled.div`
`
const TweetButton = styled.div`
display: flex;
justify-content: flex-end;
`
const Btn = styled.button`

font-size: 24px;
border-radius: 25px;
padding: 10px;
margin: 10px;
background-color: rgb(53,161,241);
color: white;


&:hover {
    opacity: 0.7;
    transition: 0.3s all;
    cursor: pointer;

}
`

const Length = styled.div`
display: flex;
justify-content: flex-end;
padding: 20px;
opacity: 0.5;
`

