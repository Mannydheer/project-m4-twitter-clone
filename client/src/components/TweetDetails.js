import React, { useEffect, useState, } from 'react';
import { useLocation } from 'react-router-dom';



const TweetDetails = () => {

    let location = useLocation();
    let splitpath = location.pathname.split('/')
    let path = splitpath[2];

    const [singleTweetState, setsingleTweetState] = useState(null)
    const [fetchCheck, setFetchCheck] = useState(false)



    //component mount
    useEffect(() => {
        console.log(path)
        const getSingleTweet = async () => {
            let getselectedTweet = await fetch(`/api/tweet/${path}`)
            let singleTweet = await getselectedTweet.json()
            setsingleTweetState(singleTweet.tweet)
            setFetchCheck(true)
        }

        getSingleTweet();
    }, [])




    return (
        <React.Fragment>
            {fetchCheck && <div>
                <div>{singleTweetState.author.displayName}</div>
                <div>@{singleTweetState.author.handle}</div>
                <img src={singleTweetState.author.avatarSrc}></img>
                {/* message */}
                <div>{singleTweetState.status}</div>
                <div>{singleTweetState.timestamp}</div>
            </div>}



        </React.Fragment>
    )
}

export default TweetDetails;