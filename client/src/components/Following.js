import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DisplayFollowers from './DisplayFollowers';



const Following = () => {

    let path = useParams().user;

    const [following, setFollowing] = useState(null);
    useEffect(() => {

        const handleGetFollowing = async () => {

            try {
                let response = await fetch(`/api/${path}/following`)
                if (response.status !== 200) {
                    throw Error('Error Occured Followers')
                }
                else {
                    let followingResponse = await response.json()
                    setFollowing(followingResponse.following)
                }
            } catch (error) {
                console.log(error)
            }
        }
        handleGetFollowing();
    }, [path])


    return (
        <React.Fragment>
            {following !== null &&
                following.map(eachUser => {

                    return (
                        <DisplayFollowers
                            key={`${eachUser.joined}${eachUser.avatarSrc}`}
                            eachUser={eachUser} />
                    )
                })
            }
        </React.Fragment>
    )
}



export default Following;