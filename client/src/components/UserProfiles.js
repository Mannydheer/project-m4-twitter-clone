import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';


const UserProfiles = ({ storeFollowers }) => {

    let location = useLocation().pathname.split('/')
    let path = location[2];
    const [selectedUser, setSelectedUser] = useState(null);
    const [userBool, setuserBool] = useState(false);

    //state for userTweet/Retweet fetch;
    const [userTweets, setUserTweets] = useState(null);

    //on mount
    //add ERROR HANDLING
    useEffect(() => {
        // handles the user profile informations.
        const handleClickedProfile = async () => {
            // console.log('GIT TRIGGERED')
            const getUserProfile = await fetch(`/api/${path}/profile`);
            const returnedProfile = await getUserProfile.json();
            setSelectedUser(returnedProfile.profile)
            setuserBool(true)
            //get all tweets related to profile.
        }
        //function call.
        //if its null, then followers was not clicked.Not undefined if I dont click on followers
        handleClickedProfile()

    }, [])


    useEffect(() => {
        const getUserTweets = async () => {
            try {
                const response = await fetch(`/api/${path}/feed`);
                console.log(response, 'RESPONSE OF USER PROFILE')
                if (response.status === 200) {
                    const userTweets = await response.json();
                    setUserTweets(userTweets);

                    // setImageState(userTweets.tweetsById.media[0])
                }
                else {
                    //better error handling
                    throw Error('Response was not 200/success')
                }
            }
            catch (err) {
                throw Error("Error Occured getting users Tweets")
            }
        }
        getUserTweets();
    }, [])

    return (
        <React.Fragment>
            {userBool &&
                <div><div>Banner <img src={selectedUser.bannerSrc}></img></div>
                    <div>Name: {selectedUser.displayName}</div>
                    <div>Profile Image<img src={selectedUser.avatarSrc}></img></div>
                    <div>Location: {selectedUser.location}</div>
                    <div>Bio: {selectedUser.bio}</div>
                    <Link to={`/${path}/followers`}>Followers: {selectedUser.numFollowers}</Link>
                    <Link to={`/${path}/following`}>Following: {selectedUser.numFollowing}</Link>
                    {/* all tweets and retweets related to user.  */}
                    {userTweets !== null && <div>
                        {userTweets.tweetIds.map((eachId, index) => {
                            return (
                                <div>
                                    <div>
                                        <img src={userTweets.tweetsById[eachId].author.avatarSrc}></img>
                                        <div>{userTweets.tweetsById[eachId].author.displayName}</div>
                                        <div>@{userTweets.tweetsById[eachId].author.handle}</div>
                                        <div>{userTweets.tweetsById[eachId].status}</div>
                                        {userTweets.tweetsById[eachId].media.length > 0 &&
                                            <img src={userTweets.tweetsById[eachId].media[0].url}></img>}
                                    </div>

                                </div>
                            )
                        })}
                    </div>}


                </div>}

        </React.Fragment >
    )


}

export default UserProfiles