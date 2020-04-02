import React, { useState, useEffect } from 'react';
import Tweet from './Tweet';
import styled from 'styled-components';
import { CurrentUserContext } from './CurrentUserContext';


const TweetText = () => {

    const [tweet, setTweet] = useState('')
    const [postedTweet, setPostedTweet] = useState(null)
    const { state } = React.useContext(CurrentUserContext)


    useEffect(() => {

        //when postedTweet holds the tweet
        if (postedTweet !== null) {

            const data = {
                status: postedTweet
            }
            const postHandler = async () => {
                let response = await fetch(`/api/tweet`, {
                    method: "POST",
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify(data)
                })

                let post = await response.json();
                console.log(post)


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

            <StyledProfileImage>
                <ImageAuthor src={state.currentUser.avatarSrc}></ImageAuthor>
            </StyledProfileImage>


            <StyledForm class="tweet" name="tweet" onSubmit={handlePostData}>
                <div class="form-content user">

                    <div class='form-item'>
                        <label for="tweetText"></label>
                        <InputTweet id="TweetText" type="text" value={tweet}
                            onChange={e => setTweet(e.target.value)}
                            name="givenTweet" placeholder="Whats happening>" required>

                        </InputTweet>
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
`
const StyledTweeting = styled.div`
border: 1px white solid;
display: flex;
width: 80%;
`

const InputTweet = styled.input`

height: 200px;
width: 650px;
border: none;
outline: none;


`

const ImageAuthor = styled.img`
border-radius: 50%;
width: 50px,;
height: 50px;
padding: 10px;
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
background-color: purple;


&:hover {
    opacity: 0.7;
    transition: 0.3s all;
    cursor: pointer;

}
`

