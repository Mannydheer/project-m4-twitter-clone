import React from 'react';
import styled from 'styled-components';
import { TweetHomeContext } from './TweetHomeContext';
import TweetActionIcon from './TweetActionIcon';
import Heart from './Heart';
import { FiDownload } from 'react-icons/fi';
import { BsChat } from 'react-icons/bs';






const TweetLikeRetweetAction = ({ allTweets, tweetId }) => {
    //dont pass allTweets since we want to reuse compoenent so we can get homefeed state form context
    const { tweetHomeFeedState, handleUserLikes, handleUserRetweets } = React.useContext(TweetHomeContext)

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

                //must change the value in the front end. 
                if (status.success) {
                    handleUserRetweets({
                        id: tweetId,
                        retweeted: true,
                        value: 1,
                    })
                }
            }
            catch (error) {
                throw Error('error retweeting')
            }
        }
        //if already liked.
        //else if to not trigger both ifs.
        else if (allTweets[tweetId].isRetweeted === true) {
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
                if (status.success) {
                    handleUserRetweets({
                        id: tweetId,
                        retweeted: false,
                        value: 0,
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
        if (allTweets[tweetId].isLiked === false) {
            try {
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
                        value: 1,
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
                        value: 0,
                    })
                }
            }
            catch (error) {
                throw Error('error liking')
            }
        }
    }
    return (
        <React.Fragment>
            <Icons>
                <Wrap>
                    {allTweets[tweetId].isLiked ? <Flex onClick={handleLiking}>
                        <Heart width={30} isToggled={true}></Heart>
                        <div style={{ position: 'relative', right: '40px', top: '5px' }}>
                            {allTweets[tweetId].numLikes}
                        </div>
                    </Flex>
                        :
                        <div onClick={handleLiking}><Heart width={30}></Heart></div>}
                </Wrap>
                <Wrap>
                    {allTweets[tweetId].isRetweeted ?
                        <Flex onClick={handleRetweeting}>
                            <TweetActionIcon size={30} color={'green'} />
                            <div style={{ position: 'relative', right: '40px', top: '5px' }}>
                                {allTweets[tweetId].numRetweets}</div>
                        </Flex>
                        :
                        <div onClick={handleRetweeting}><TweetActionIcon size={30} color={'white'} /></div>}
                </Wrap>
                <Wrap>
                    <FiDownload size={30} color={'white'} />
                </Wrap>
                <Wrap>
                    <BsChat size={30} color={'white'} />
                </Wrap>
            </Icons>
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

const Wrap = styled.div`
display: flex;
padding: 5px;


`
const Flex = styled.div`
display: flex;


`
