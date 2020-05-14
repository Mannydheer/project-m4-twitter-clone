import React, { useState } from 'react';
import styled from 'styled-components';
import { CurrentUserContext } from './CurrentUserContext';
import { TweetHomeContext } from './TweetHomeContext';
import Error from './Error';

const TweetText = ({ }) => {

    const [tweet, setTweet] = useState('')
    const { state } = React.useContext(CurrentUserContext)
    const { handlePost } = React.useContext(TweetHomeContext)

    const postHandler = async () => {
        const data = {
            status: tweet
        }
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

    const handlePostData = (event) => {
        event.preventDefault();
        postHandler();
        //posthandler will enter the CALLBACK and setTweet will initiate...
        //cause a reset of the input box, and when postHanlder has completed, it will be released from callbacl
        //and the post will be done
        setTweet('')
        //store input into postedTweet
    }

    //on submit will store tweet
    return (
        <StyledTweeting>
            <StyledForm className="tweet" name="tweet" onSubmit={handlePostData}>
                <StyledProfileImage>
                    <ImageAuthor src={state.currentUser.avatarSrc}></ImageAuthor>
                </StyledProfileImage>
                <div>
                    <label htmlFor="tweetText"></label>
                    <TextTweet id="TweetText" type="text" value={tweet}
                        onChange={e => setTweet(e.target.value)}
                        name="givenTweet" placeholder="Whats happening..."
                        maxLength={280} required>
                    </TextTweet>
                    <Length>
                        <div>{280 - tweet.length}</div>
                    </Length>
                </div>
                <TweetButton>
                    <Btn className='button confirm' id='confirm-button'>
                        Meow
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
width: 100%;

@media screen and (max-width: 768px) {
}

`
const StyledTweeting = styled.div`
display: flex;
width: 80%;
margin: 0 auto;
@media screen and (max-width: 768px) {
width: 100%;
}

`

const TextTweet = styled.textarea`
color: white;
height: 100%;
width: 100%;
border: none;
outline: none;
resize: none;
font-size: 1.5rem;
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
outline: none;
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

