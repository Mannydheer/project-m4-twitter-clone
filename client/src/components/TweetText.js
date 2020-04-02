import React, { useState, useEffect } from 'react';
import Tweet from './Tweet';

const TweetText = () => {

    const [tweet, setTweet] = useState('')
    const [postedTweet, setPostedTweet] = useState(null)


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
    return (<form class="tweet" name="tweet" onSubmit={handlePostData}>
        <div class="form-content user">
            <div class='form-item'>
                <label for="tweetText">Text</label>
                <input id="TweetText" type="text" value={tweet}
                    onChange={e => setTweet(e.target.value)}
                    name="givenTweet" placeholder="Enter Tweet" required />
            </div>
            <button class='button confirm' id='confirm-button'>
                Tweet
            </button>
        </div>
    </form>)


}


export default TweetText