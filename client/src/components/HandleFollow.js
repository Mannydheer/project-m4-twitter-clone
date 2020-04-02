import React, { useEffect } from 'react';


const HandleFollow = ({ setFollowUnfollow, handle }) => {



    useEffect(() => {

        const updateFollowers = async () => {


            //fetch to check for follows.

            let followResponse = await fetch(`/api/${handle}/follow`, {
                method: 'PUT',
            })
            console.log(followResponse)
            //if you are already following
            if (followResponse.status === 409) {
                let unfollowResponse = await fetch(`/api/${handle}/unfollow`, {
                    method: 'PUT',
                })
                console.log(unfollowResponse)
            }
            setFollowUnfollow(false)
        }

        updateFollowers();
    }, [])
    return (
        <div>
            HandleFollow
        </div>
    )


}


export default HandleFollow